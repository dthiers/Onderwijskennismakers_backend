module.exports = function (pool) {
    return {
        search: function (req, res, next) {
            var returnValue = {};
            var queryValue = '%' + req.params.query + '%';
            var completionCounter = 0;
            var completionMax = 4;

            // Content filtering
            var contentSql = 'SELECT content.id, content.Type, content.name, content.link, content.shortDescription, concat(user.firstName, " ", user.lastName) AS author, content.createdAt ' +
                'FROM content ' +
                'LEFT JOIN user ON user.id = content.User_id ' +
                'WHERE name LIKE ? ' +
                'AND isPublic = 1';

            pool.query(contentSql, [queryValue], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    var matchedContent = result;
                    var matchedIds = [];

                    matchedContent.forEach(function(item) {
                        item.createdAt = createDateString(item.createdAt);
                        matchedIds.push(item.id);
                    });

                    var contentRatingSql = 'SELECT Content_id as id, AVG(value) as rating ' +
                        'FROM content_rating ' +
                        'GROUP BY Content_id';

                    pool.query(contentRatingSql, [queryValue], function (err, result, fields) {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        else {
                            result.forEach(function (item) {
                                for(var i=0;i<matchedContent.length;i++)
                                {
                                    if (matchedContent[i].id == item.id) {
                                        matchedContent[i].rating = item.rating;
                                        break;
                                    }
                                }
                            });

                            // Set matched content to return value
                            returnValue["matched_content"] = matchedContent;

                            completionCounter++;
                            readyForResponse(res, returnValue, completionCounter, completionMax);
                        }
                    });
                }
            });

            var keywordSql = 'SELECT id, keyword, description ' +
                'FROM keyword ' +
                'WHERE keyword LIKE ?';
            pool.query(keywordSql, [queryValue], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    var matchedKeywords = result;
                    returnValue["matched_keywords"] = matchedKeywords;

                    var keywordUsersSql = 'SELECT uhk.User_id, uhk.Keyword_id, u.id, concat(u.firstName, " ", u.lastName) AS "name", u.functionDescription, u.profileImage FROM user AS u ' +
                            'LEFT JOIN user_has_keyword AS uhk ON u.id = uhk.User_id ' +
                            'WHERE Keyword_id IN(' +
                                'SELECT id FROM keyword ' +
                                'WHERE keyword LIKE \'' + queryValue + '\'' +
                            ');';

                    pool.query(keywordUsersSql, [queryValue], function (err, result, fields) {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        else {
                            var matchedUsers = result;
                            // Add users array for each keyword
                            matchedKeywords.forEach(function(keyword) {
                                keyword.users = [];
                            });

                            matchedUsers.forEach(function (user) {
                                matchedKeywords.forEach(function(keyword) {
                                    if(keyword.id == user.Keyword_id) {
                                        delete user.User_id;
                                        delete user.Keyword_id;
                                        keyword.users.push(user);
                                    }
                                });
                            });

                            returnValue["matched_keywords"] = matchedKeywords;

                            completionCounter++;
                            readyForResponse(res, returnValue, completionCounter, completionMax);
                        }
                    });
                }
            });

            var personSql = 'SELECT id, concat(firstName, " ", lastName) AS "name", functionDescription, profileImage ' +
                'FROM user ' +
                'WHERE firstName LIKE ? ' +
                'OR lastName LIKE ?';

            pool.query(personSql, [queryValue, queryValue], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    var matchedUsers = result;
                    returnValue["matched_users"] = matchedUsers;
                    completionCounter++;
                    readyForResponse(res, returnValue, completionCounter, completionMax);
                }
            });

            var schoolSql = 'SELECT id, name, logo ' +
                'FROM school ' +
                'WHERE name LIKE ?';

            pool.query(schoolSql, [queryValue], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    var matchedSchools = result;
                    returnValue["matched_schools"] = matchedSchools;
                    completionCounter++;
                    readyForResponse(res, returnValue, completionCounter, completionMax);
                }
            });

            // WIP Tag searching
            /*
            var keywordSql = 'SELECT * ' +
                'FROM tag ' +
                'WHERE name LIKE ?';
            pool.query(keywordSql, [queryValue], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    var matchedTags = result;
                    returnValue["matched_tags"] = matchedTags;

                    completionCounter++;
                    readyForResponse(res, returnValue, completionCounter, completionMax);
                }
            });
            */
        }
    }

    function readyForResponse(res, data, completionCounter, completionMax) {
        if (completionCounter >= completionMax) {
            res.return(data)
        }
    }

    function createDateString(input) {
        var d = new Date(input);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');
    }

    function pad(s) { return (s < 10) ? '0' + s : s; }
}
