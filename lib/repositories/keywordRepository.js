
/**
*
* id
* keyword
*
**/

// TODO: database meegeven
module.exports = function(pool) {

    var baseRepo = require('./baseRepository')(pool, "keyword");

    return {
        baseRepo,

        getWeb: function(req, res, next) {
            console.log(req.params.id);
            var keyword = {};
            var users = [];
            var allUsers = [];
            
            var sql =   'SELECT user.id, concat(user.firstName, " ", user.lastName) AS "name", user.functionDescription, user.profileImage ' +
                        'FROM user ' +
                        'LEFT JOIN user_has_keyword ON user.id = user_has_keyword.User_id ' +
                        'WHERE user_has_keyword.Keyword_id = ?';

            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {

                    for (var i = 0; i < result.length; i++) {
                        allUsers.push(result[i].id);
                    }
                    users = result;

                    var keywordSql = 'SELECT keyword.id, keyword.keyword ' +
                        'FROM keyword ' +
                        'WHERE keyword.id = ?';

                    pool.query(keywordSql, [req.params.id], function (err, result, fields) {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        else {
                            keyword = {
                                "id": result[0].id,
                                "keyword": result[0].keyword
                            }
                        }
                    });
                    
                    //Get all content which belongs to the users in the web
                    var contentSql = 'SELECT content.*, concat(user.firstName, " ", user.lastName) AS "author", AVG(content_rating.value) as rating ' +
                        'FROM content ' +
                        'LEFT JOIN user ON content.User_id = user.id ' +
                        'LEFT JOIN content_rating ON content_rating.Content_id = content.id ' +
                        'WHERE content.User_id IN (?) ' +
                        'GROUP BY content.id ' +
                        'ORDER BY rating DESC ' +
                        'LIMIT 10';

                    pool.query(contentSql, [allUsers, req.params.id], function (err, result, fields) {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        else {
                            res.return({
                                "keyword": keyword,
                                "users": users,
                                "content": result
                            });
                        }
                    });
                }
            });
        },
        
        getTags: function(req, res, next) {
            if (req.query.linked == "false") {
                var sql =   'SELECT tag.id, tag.name ' +
                            'FROM tag ' +
                            'WHERE tag.id NOT IN    (SELECT tag.id ' +
                                                    'FROM tag ' +
                                                    'LEFT JOIN keyword_has_tag ON tag.id = keyword_has_tag.Tag_id ' +
                                                    'WHERE keyword_has_tag.Keyword_id = ?) ' +
                            'ORDER BY tag.id';
            }
            else { 
                var sql =   'SELECT tag.id, tag.name ' +
                            'FROM tag ' +
                            'LEFT JOIN keyword_has_tag ON tag.id = keyword_has_tag.Tag_id ' +
                            'WHERE keyword_has_tag.Keyword_id = ? ' +
                            'ORDER BY tag.id';      
            }

            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.return(result);
                }
            })
        },
        
        addTag: function(req, res, next) {
            console.log(req.params.id);
            var sql =   'INSERT INTO keyword_has_tag SET Keyword_id = ?, ?';
            
            pool.query(sql, [req.params.id, req.body], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.json("Succesfully created an entity in the keyword_has_tag table.");
                }
            })
        },
        
        deleteTagById: function(req, res, next) {
            var sql = 'DELETE FROM keyword_has_tag WHERE Keyword_id = ? AND Tag_id ?';
            
            pool.query(sql, [req.params.id, req.params.tag_id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.json("Successfully deleted an entity in the keyword_has_tag table")
                }
            })
        }
    }

}