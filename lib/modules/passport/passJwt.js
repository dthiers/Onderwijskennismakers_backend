/**
*
* LocalStategy used in PassportModule
*
* Passport is injected to bind the stategy to it
*
**/

module.exports = function(passport, userRepo){

    var JwtStrategy = require('passport-jwt').Strategy,
        jwt = require('jwt-simple'),
        ExtractJwt = require('passport-jwt').ExtractJwt
        moment = require('moment');

    var passJwt = {
      authJwt: function(req, res, next){
        if(typeof req.get('authorization') === 'undefined'){
          res.returnErr(401);
        } else {
          var obj = jwt.decode(req.get('authorization'), 'secret');

          // If user than he was granted a JWT token
          /**
          *
          * TODO: this doesn't feel right.
          *
          **/
          var user = userRepo.getUserByEmail(obj.issuer);

          if(user){
            next();
          }
          else {
            // If user does not match the issuer
            res.returnErr(401, "Wrong issuer. Token is invalid");
          }
        }
      },
      // Generate a JWT token for a user to authenticate itself with.
      generateJwt: function(req, res, next) {
        var exp = moment().add(7, 'days').valueOf(); // Valid for 7 days

        // TODO: hier een JWT token aanmaken en die terug sturen naar de user
        var token = jwt.encode({
            issuerId: req.user[0].id,
            issuer: req.user[0].email,
            expires: exp
        }, 'secret');

        console.log(jwt.decode(token, 'secret'));

        if(typeof token !== "undefined"){
          req.token = token;
          next();
        } else {
          req.returnErr(401);
        }
      }
    }

    return passJwt;

}
