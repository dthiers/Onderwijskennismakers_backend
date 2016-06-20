
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
                'WHERE school_has_user.School_id = ? AND (content.User_id > 0 OR school_has_user.isPrincipal = 1)' +
                'GROUP BY user.id';

            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    res.return(result);
                }
            })
        },
        
        addExpert: function(req, res, next){
            var sql =   'INSERT INTO school_has_user SET School_id = ?, ?, isPrincipal = 0';
            
            pool.query(sql, [req.params.id, req.body], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    res.json("Succesfully created an entity in the school_has_user table.");
                }
            })
        },

        getWeb: function(req, res, next) {
            var sql =   'SELECT * ' +
                        'FROM school ' +
                        'WHERE id = ?';
                        
            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) { console.log(err); return next(err); }
                else {
                    var school = result[0];
                    var allUsers = [];
                    
                    var schoolUsersSql =    'SELECT user.id, concat(user.firstName, " ", user.lastName) AS "name", user.functionDescription, user.profileImage ' +
                                            'FROM school_has_user ' +
                                            'LEFT JOIN user ON school_has_user.User_id = user.id ' +
                                            'WHERE school_has_user.School_id = ?';
                    
                    pool.query(schoolUsersSql, [req.params.id], function (err, result, fields) {
                        if (err) { console.log(err); return next(err); }
                        else{
                            var users = result;
                            
                            for (var i = 0; i < result.length; i++){
                                user = result[i];
                                allUsers.push(user["id"]);
                            }
                            
                            var schoolContentSql =  'SELECT content.*, concat(user.firstName, " ", user.lastName) AS "author", user.profileImage, AVG(content_rating.value) as rating ' +
                                                    'FROM content ' +
                                                    'LEFT JOIN user ON content.User_id = user.id ' +
                                                    'LEFT JOIN content_rating ON content_rating.Content_id = content.id ' +
                                                    'WHERE content.User_id IN (?) ' +
                                                    'GROUP BY content.id ' +
                                                    'ORDER BY rating DESC ' +
                                                    'LIMIT 10'; 
                                                    
                            pool.query(schoolContentSql, [allUsers], function(err, result, fields) {
                                if (err) { console.log(err); return next(err); }
                                else {
                                    res.return({
                                        "school": school,
                                        "users": users,
                                        "content": result
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },
        
        getPrincipal: function(req, res, next){
            var sql =   'SELECT User_id ' +
                        'FROM school_has_user ' +
                        'WHERE School_id = ? AND isPrincipal = 1';
                       
            pool.query(sql, [req.params.id], function(err, result, fields) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else{
                    res.return(result);
                }
            })
        },
        
        setPrincipal: function(req, res, next){
            var sql =   'INSERT INTO school_has_user SET School_id = ?, ?, isPrincipal = 1';
            
            pool.query(sql, [req.params.id, req.body], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                else {
                    res.json("Succesfully created an entity in the school_has_user table.");
                }
            })
        },       
    }
};
