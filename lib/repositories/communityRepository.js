
/**
*
* id
* name
* createdAt
* lastUpdate
* public
* isFrozen
*
**/



// TODO: database meegeven
module.exports = function(pool){

  var baseRepo = require('./baseRepository')(pool, "community");

  return {
    baseRepo,
    
    getModerator: function (req, res, next){
        console.log(req.params.id);
        var sql =   'SELECT User_id ' +
                    'FROM community_has_user ' +
                    'WHERE isModerator = 1 ' +
                    'AND Community_id = ?';
        
        pool.query(sql, [req.params.id], function(err, result, fields) {
            if (err) { console.log(err); return next(err); }
            else {
                res.return(result);
            }
        })
    }
  }

}
