// TODO: database requiren
var School = require("mongoose").model('School');

var schoolRepository = function(){

  //console.log("========== " + model);

  var self = this;

  // Get all users
  self.getAllSchools = function(req, res, next){
    res.json("schoolsRepo");
  }

  self.addSchool = function(req, res, next){
    next();
  }
}

module.exports = schoolRepository;
