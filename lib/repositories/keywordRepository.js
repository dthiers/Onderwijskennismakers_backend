
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
            var sql =   'SELECT user.id, concat(user.firstName, " ", user.lastName) AS "name", user.functionDescription, user.profileImage ' +
                        'FROM user ' +
                        'LEFT JOIN user_has_keyword ON user.id = user_has_keyword.User_id ' +
                        'WHERE user_has_keyword.Keyword_id = ?';

            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    var keyword = {};
                    var users = result;

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
                            
                            res.return({
                                "keyword": keyword,
                                "users": users
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