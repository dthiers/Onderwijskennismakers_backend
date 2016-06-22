/**
*
* Route that handles all the passport requests
*
* TODO: inject passport, set up route for passLocal, passFacebook, passLinkedIn
*
*/

var express = require('express');
var router = express.Router();

module.exports = function(passport, passportModule){
    var jwt     = require('jwt-simple'),
        moment  = require('moment');
  /**
  *
  * Route for LocalStategy login
  *
  **/
  router.route('/local')
    // '/local/login' POST to login
    .post(passport.authenticate('local'), function(req, res, next) {

        // var exp = moment().add(7, 'days').valueOf(); // Valid for 7 days
        //
        // // TODO: hier een JWT token aanmaken en die terug sturen naar de user
        // var token = jwt.encode({
        //     issuer: req.user[0].email,
        //     expires: exp
        // }, 'secret');
        //
        // console.log(jwt.decode(token, 'secret'));

      res.json({
        data: req.user,
        token: req.token,
        success: true,
        message: 'Success dr mee'
      })
    })
    // '/login/local' GET
    .get(function(req, res, next){
      res.json('Sorry, Niels1 :(');
    });

  /**
  *
  * Route for JWT token request
  *
  * TODO: do this.
  *
  **/


  return router;
}
