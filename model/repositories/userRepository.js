// TODO: database requiren
var User = require("mongoose").model('User');

var userRepository = function(){

  //console.log("========== " + model);

  var self = this;

  // Get all users
  self.getAllUsers = function(req, res, next){
    res.json("userRepo");
  }

  self.addUser = function(req, res, next){
    next();
  }
}

module.exports = userRepository;
