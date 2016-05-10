
/**
*
* id
* keyword
*
**/



// TODO: database meegeven
module.exports = function(pool){

  var baseRepo = require('./baseRepository')(pool, "keyword");

  return {
    baseRepo,
  }

}