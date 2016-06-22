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
    var jwt = require('jwt-simple');
  /**
  *
  * Route for LocalStategy login
  *
  **/
  router.route('/local')
    // '/local/login' POST to login
    .post(passport.authenticate('local'), function(req, res, next) {
       
        // TODO: hier een JWT token aanmaken en die terug sturen naar de user
        var token = jwt.encode({
            id: req.user.id,
            username: req.user.firstName
        }, 'secret');
        
        console.log(req.user);
       
      //res.return(req.user, 'data', 'je moeder');
      res.json({
        data: req.user,
        token: token,
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
