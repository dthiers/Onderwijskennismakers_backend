
/**
*
* id
* name
*
**/



// TODO: database meegeven
module.exports = function(pool){

  var baseRepo = require('./baseRepository')(pool, "tag");

  return {
    baseRepo,
    
    // get all function including ORDER BY id
    getAll: function(req, res, next) {
      var sql = 'SELECT * FROM tag ORDER BY id';

      pool.query(sql, function(err, result, fields) {
        if (err) { console.log(err); return next(err); }
        else {
          res.return(result);
        }
      })
    }
  }

}