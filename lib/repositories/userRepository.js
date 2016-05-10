
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
        // get user by username'

        // get web data by user id
        getWeb: function(req, res, next) {
            console.log(req.params.id);
            var sql = 'SELECT keyword.id, keyword.keyword ' +
                      'FROM user ' +
                      'LEFT JOIN user_has_keyword ON user.id = user_has_keyword.User_id ' +
                      'LEFT JOIN keyword ON user_has_keyword.Keyword_id = keyword.id ' +
                      'WHERE user.id = ' + req.params.id;

            pool.query(sql, function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.return(result);
                }
            })
        }

    }

}
