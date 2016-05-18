/**
*
* Route to handle registration of a user
*
**/

var express = require('express');
var router = express.Router();

module.exports = function(registrationRepo) {

  //
  router.route('/')
    .get(registrationRepo.test)
    .post(registrationRepo.registerUser);

  return router;
}
