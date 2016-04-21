
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
module.exports = function(newsql){

  var baseRepo = require('./baseRepository')(newsql, 'User');

  return {
    baseRepo,
    // Add user to database
    createUser: function(req, res, next){
      var data = req.body;
      // var data = {};
      // for(var k in req.body){
      //   data[k] = req.body[k];
      // }
      newsql.insert('User', req.body, function(err, pk) {
        if(err) {  console.log(err); return next(err); }
        else {
          res.send("User '" + data.firstname + "' is added to the database with PK: " + pk.id);
        }
      })
    }
  }

}
