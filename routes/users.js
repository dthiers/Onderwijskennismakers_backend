var express = require('express');
var router = express.Router();


module.exports = function(userRepo) {
  router.route('/')
    .get(userRepo.getAllUsers);

  return router;
};
