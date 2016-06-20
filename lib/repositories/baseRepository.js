
// Newsql object + tablename
module.exports = function(pool, table){

  var moment = require("moment");

  var baseRepo = {
    // Returns the current date in datetime format required for sql
    getDateNow: function(){
      return moment().format("YYYY-MM-DD HH:mm:ss");
    },
    // get all function
    getAll: function(req, res, next) {
      var sql = 'SELECT * FROM ' + table;

      pool.query(sql, function(err, result, fields) {
        if (err) { console.log(err); return next(err); }
        else {
          res.return(result);
        }
      })
    },
    // create function
    create: function(req, res, next) {
      
      if (table != "tag" && table != "keyword"){
        var createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
        req.body.createdAt = createdAt;
        req.body.lastUpdate = createdAt;
      }

      var sql = 'INSERT INTO ' + table + ' SET ?';

      pool.query(sql, req.body, function(err){
        if(err) { console.log(err); return next(err); }
        else{
          res.json("Succesfully created an entity in the " + table + " table.");
        }
      })
    },
    // get by id
    getById: function(req, res, next){
      console.log(req.params.id);
      var sql = 'SELECT * FROM ' + table + ' WHERE id = ' + req.params.id;

      pool.query(sql, function(err, result, fields) {
        if (err) { console.log(err); return next(err); }
        else{
          res.return(result);
        }
      })
    },
    // update by id
    updateById: function(req, res, next){
      if (table != "tag" && table != "keyword"){
        var lastUpdate = moment().format("YYYY-MM-DD HH:mm:ss");
        req.body.lastUpdate = lastUpdate;
      };

      var sql = 'UPDATE ' + table + ' SET ? WHERE id = ' + req.params.id;

      pool.query(sql, req.body, function(err){
        if(err) { console.log(err); return next(err); }
        else{
          res.json("Succesfully updated an entity in the " + table + " table.");
        }
      })
    },
    // delete by id
    deleteById: function(req, res, next){
      console.log(req.params.id);
      var sql = 'DELETE FROM ' + table + ' WHERE id = ' + req.params.id;
      console.log(sql);
      pool.query(sql, function(err){
        if(err) { console.log(err); return next(err); }
        else{
          res.json("Successfully deleted an entity in the " + table + " table with id " + req.params.id);
        }
      })
    }
  }

  return baseRepo;
}
