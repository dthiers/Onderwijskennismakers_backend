
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
  }

}
