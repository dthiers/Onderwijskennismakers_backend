
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
module.exports = function(newsql){

  var baseRepo = require('./baseRepository')(newsql, "community");

  return {
    baseRepo,
    // Add community to database
    createCommunity: function(req, res, next){
      var data = req.body;
      // var data = {};
      // for(var k in req.body){
      //   data[k] = req.body[k];
      // }
      newsql.insert('community', req.body, function(err, pk) {
        if(err) {  console.log(pk); console.log(err); return next(err); }
        else {
          res.send("community '" + data.name + "' is added to the database with PK: " + pk.id);
        }
      })
    }
  }

}
