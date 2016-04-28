/**
*
* Route that handles all the passport requests
*
* TODO: inject passport, set up route for passLocal, passFacebook, passLinkedIn
*
*/

var express = require('express');
var router = express.Router();

module.exports = function(passport){

  /**
  *
  * Route for LocalStategy login
  *
  **/
  router.route('/local')
    // '/local/login' POST to login
    .post(passport.authenticate('local'), function(req, res, next) {
      //res.return(req.user, 'data', 'je moeder');
      res.json({
        data: req.user,
        success: true,
        message: 'Success dr mee'
      })
    })
    // '/login/local' GET
    .get(function(req, res, next){
      res.json('Je moeder');
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
