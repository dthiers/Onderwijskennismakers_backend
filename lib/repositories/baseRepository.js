
// Newsql object + tablename
module.exports = function(newsql, table){
  var baseRepo = {

    getAll: function(req, res, next) {
      newsql.find(table, {}, function(err, obj) {
        if(err) { console.log(err); return next(err); }
        else {
          res.json(obj);
        }
      })
    },
    // create function
    create: function(req, res, next){
      newsql.insert(table, req.body, function(err, pk) {
        if(err) { console.log(err); return next(err); }
        else {
          res.json("Succesfully added user, the PK is: " + pk.id);
        }
      })
    },
    // get by id
    getById: function(req, res, next){
      console.log(req.params.id);
      newsql.find(table, { id: req.params.id }, function(err, obj){
        if(err) { console.log(err); return next(err); }
        else {
          res.json(obj);
        }
      })
    },
    updateById: function(req, res, next){
      console.log(req.body.id);
      newsql.update(table, req.body, { id: req.body.id }, function(err, obj) {
        if(err) { console.log(err); return next(err); }
        else {
          console.log(obj);
          res.json("Succesfully udpated");
        }
      })
    },
    deleteById: function(req, res, next){
      console.log(req.params.id);
      newsql.del(table, { id: req.params.id }, function(err, obj) {
        if(err) { console.log(err); return next(err); }
        else {
          res.json("Succesfully deleted obj from " + table)
        }
      })
    }

  }

  return baseRepo;
}
