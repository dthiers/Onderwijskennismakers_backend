
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
  }

}