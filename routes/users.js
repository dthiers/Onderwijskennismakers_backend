var express = require('express');
var router = express.Router();


module.exports = function(userRepo) {
  //return function(req, res, next){
    router.route('/')
      .get(userRepo.getAllUsers);

    return router;
  //}
};
