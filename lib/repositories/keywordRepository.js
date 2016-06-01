
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
                        console.log("henk");
                    }
                    users = result;

                    var keywordSql =    'SELECT keyword.id, keyword.keyword ' +
                                        'FROM keyword ' +
                                        'WHERE keyword.id = ?';

                    pool.query(keywordSql, [req.params.id], function(err, result, fields) {
                        if (err) { console.log(err); return next(err); }
                        else {
                            keyword = {
                                "id": result[0].id,
                                "keyword": result[0].keyword
                            }
                        }
                    })
                    
                    
                    //Get all content which belongs to the users in the web
                    var contentSql =    'SELECT content.*, concat(user.firstName, " ", user.lastName) AS "author", AVG(content_rating.value) as rating ' +
                                        'FROM content ' +
                                        'LEFT JOIN user ON content.User_id = user.id ' +
                                        'LEFT JOIN content_rating ON content_rating.Content_id = content.id ' +
                                        'WHERE content.User_id IN (?) ' +
                                        'AND content.id IN (SELECT Content_id ' +
					                    '                   FROM keyword_has_tag ' +
					                    '                   LEFT JOIN content_has_tag ON content_has_tag.Tag_id = keyword_has_tag.Tag_id ' +
					                    '                   WHERE keyword_has_tag.Keyword_id = ? ' +
					                    '                   GROUP BY content_has_tag.Content_id) ' +
                                        'GROUP BY content.id ' +
                                        'ORDER BY rating DESC ' +
                                        'LIMIT 10';                                        
                    
                    console.log("ALL USERS = " + allUsers);
                    
                    pool.query(contentSql, [allUsers, req.params.id], function(err, result, fields) {
                        if (err) { console.log(err); return next(err); }
                        else {
                            res.return({
                                "keyword": keyword,
                                "users": users,
                                "content": result
                            });
                        }
                    })
                }
            })      
        },
        
        getTags: function(req, res, next) {
            console.log(req.params.id);
            var sql =   'SELECT tag.id, tag.name ' +
                        'FROM tag ' +
                        'LEFT JOIN keyword_has_tag ON tag.id = keyword_has_tag.Tag_id ' +
                        'WHERE keyword_has_tag.Keyword_id = ?';
            
            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.return(result);
                }
            })
        }
    }

}