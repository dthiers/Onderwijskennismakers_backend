
/**
*
* id
* Type
* name
* content
* link
* createdAt
* lastUpdate
* User_id
* Community_id
* shortDescription
* isFrozen
*
**/



// TODO: database meegeven
module.exports = function(pool){

  var baseRepo = require('./baseRepository')(pool, "content");

  return {
    baseRepo,
  }

}
