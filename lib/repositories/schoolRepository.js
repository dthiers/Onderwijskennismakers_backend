
/**
*
* id
* name
* logo
* description
* createdAt
* updatedAt
*
**/



// TODO: database meegeven
module.exports = function(pool) {

    var baseRepo = require('./baseRepository')(pool, "school");

    return {
        baseRepo,

        getExperts: function(req, res, next) {
            var sql = 'SELECT user.id, user.firstName, user.lastName, user.email, user.functionDescription, user.profileImage, school_has_user.isPrincipal ' +
                'FROM school_has_user ' +
                'LEFT JOIN user ON school_has_user.User_id = user.id ' +
                'LEFT JOIN content ON user.id = content.User_id ' +
                'WHERE school_has_user.School_id = ? AND content.User_id > 0 ' +
                'GROUP BY user.id';

            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.return(result);
                }
            })
        }
    }

}
