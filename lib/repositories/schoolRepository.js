
/**
*
* id
* name
* logo
* description
* createdAt
* updatedAt
*
**/



// TODO: database meegeven
module.exports = function(pool){

  var baseRepo = require('./baseRepository')(pool, "school");

  return {
    baseRepo,
  }

}
