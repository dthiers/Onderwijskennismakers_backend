
/**
*
* id
* firstName
* lastName
* email
* password
* functionDescription
* profileImage
* createdAt
* lastUpdate
* isAdmin
* isFrozen
*
**/

// TODO: database meegeven
module.exports = function(pool) {

    var baseRepo = require('./baseRepository')(pool, 'User');

    return {
        pool,
        baseRepo,
        //Hier komen nog extra routes die buiten de baseroute vallen
        // get user details by user id
        getDetails: function(req, res, next) {
            var sql =   'SELECT user.*, school_has_user.School_id, school.name ' +
                        'FROM user ' +
                        'LEFT JOIN school_has_user ON school_has_user.User_id = user.id ' +
                        'LEFT JOIN school ON school_has_user.School_id = school.id ' +
                        'WHERE user.id = ?';
                        
            pool.query(sql, [req.params.id], function(err, result, fields){
                if (err) { console.log(err); return next(err); }
                else {
                    res.return(result);
                }
            })
        },

        // get web data by user id
        getWeb: function(req, res, next) {
            console.log(req.params.id);
            
            //Get all keywords (and the users connect to those keywords) which belong to the given userId
            var sql =   'SELECT keyword.id as keywordId, keyword.keyword, user.id as userId, user.firstName, user.lastName, user.functionDescription, user.profileImage ' +
                        'FROM user ' +
                        'LEFT JOIN user_has_keyword ON user.id = user_has_keyword.User_id ' +
                        'LEFT JOIN keyword ON user_has_keyword.Keyword_id = keyword.id ' +
                        'WHERE keyword.id IN (SELECT Keyword_id FROM user_has_keyword WHERE User_id = ?) AND user.id != ?';

            pool.query(sql, [req.params.id, req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    var user = {};
                    var keywords = [];
                    var hashMap = {};
                    var oldDataArray = result;
                    var arrayCounter = 0;
                    var allUsers = [];
                    
                    allUsers.push(parseInt(req.params.id));

                    for (var i = 0; i < oldDataArray.length; i++) {
                        oldData = oldDataArray[i];
                        keyId = oldData.keywordId;
                        
                        if(allUsers.indexOf(oldData.userId) < 0){
                            allUsers.push(oldData.userId);                           
                        }

                        if (keyId in hashMap) {
                            keywords[hashMap[keyId]].users.push(
                                {
                                    "id": oldData.userId,
                                    "name": oldData.firstName + " " + oldData.lastName,
                                    "function": oldData.functionDescription,
                                    "profileImage": oldData.profileImage
                                }
                            )
                        }
                        else {
                            keywords.push(
                                {
                                    "id": oldData.keywordId,
                                    "keyword": oldData.keyword,
                                    "users": [
                                        {
                                            "id": oldData.userId,
                                            "name": oldData.firstName + " " + oldData.lastName,
                                            "function": oldData.functionDescription,
                                            "profileImage": oldData.profileImage
                                        }
                                    ]

                                }
                            )
                            hashMap[keyId] = arrayCounter;
                            arrayCounter++;
                        }
                    }

                    //Get all details of the user in the middle
                    var userSql =   'SELECT user.id, user.firstName, user.lastName, user.functionDescription, user.profileImage ' +
                                    'FROM user ' +
                                    'WHERE user.id = ?';

                    pool.query(userSql, [req.params.id], function(err, result, fields) {
                        if (err) { console.log(err); return next(err); }
                        else {
                            user = {
                                "id": result[0].id,
                                "name": result[0].firstName + " " + result[0].lastName,
                                "function": result[0].functionDescription,
                                "profileImage": result[0].profileImage
                            }
                        }
                    })
                    
                    //Get all content which belongs to the users in the web
                    var contentSql =    'SELECT content.*, concat(user.firstName, " ", user.lastName) AS "author", AVG(content_rating.value) as rating ' +
                                        'FROM content ' +
                                        'LEFT JOIN user ON content.User_id = user.id ' +
                                        'LEFT JOIN content_rating ON content_rating.Content_id = content.id ' +
                                        'WHERE content.User_id IN (?) ' +
                                        'GROUP BY content.id ' +
                                        'ORDER BY rating DESC ' +
                                        'LIMIT 10';                                        
                    
                    console.log(allUsers);
                    
                    pool.query(contentSql, [allUsers], function(err, result, fields) {
                        if (err) { console.log(err); return next(err); }
                        else {
                            res.return({
                                "user": user,
                                "keywords": keywords,
                                "content": result,
                            });
                        }
                    })
                }
            })
        },
        
        getContent: function(req, res, next){
            var sql =   'SELECT * ' +
                        'FROM content ' +
                        'WHERE User_id = ?';
            
            pool.query(sql, [req.params.id], function(err, result, fields){
                if (err) { console.log(err); return next(err); }
                else{
                    res.return(result);
                }
            })
        }
    }
}
