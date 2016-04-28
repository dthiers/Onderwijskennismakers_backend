
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
module.exports = function(pool){

  var baseRepo = require('./baseRepository')(pool, 'User');

  return {
    pool,
    baseRepo,
    //Hier komen nog extra routes die buiten de baseroute vallen
    // get user by username
    getUserbyEmail: function(email, callback){
      var sql = 'SELECT * FROM `user` WHERE email = ' + pool.escape(email);
      pool.query(sql, function(err, user, fields) {
        //return [err, user, field];
        callback(err, user, fields);
      })
    }
  }

}
