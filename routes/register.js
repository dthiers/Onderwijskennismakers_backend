/**
*
* Route to handle registration of a user
*
**/

var express = require('express');
var router = express.Router();

module.exports = function(registrationRepo) {

  //
  Router.route('/')
    .post(registrationRepo.registerUser);

  return router;
}
