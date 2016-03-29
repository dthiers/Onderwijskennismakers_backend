// TODO: database requiren
var School = require("mongoose").model('Community');

var communityRepository = function(){

  //console.log("========== " + model);

  var self = this;

  // Get all users
  self.getAllCommunities = function(req, res, next){
    res.json("communityRepository");
  }

  self.addCommunity = function(req, res, next){
    next();
  }
}

module.exports = communityRepository;
