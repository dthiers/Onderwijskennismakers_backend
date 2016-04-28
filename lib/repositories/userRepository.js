
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
  }

}
