/**
*
* Passport strategy used in passportModule
*
**/

module.exports = function(passport, userRepo, secret){

  var JwtStrategy     = require('passport-jwt').Strategy,
      ExtractJwt      = require('passport-jwt').ExtractJwt,
      jwt             = require('jwt-simple'),

      opts            = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey   : secret.jwt,
        audience      : 'api-onderwijskennismakers.herokuapp.com'
      };


  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // Get user by email.
    userRepo.getUserbyEmail(jwt_payload.email, function(err, user, fields) {
      if(err) { console.log('We doen iets fout in de database'); return done(err)}
      if(user){
        done(null, user);
      }
      else {
        done(null, false);
      }
    })
  }))



  var jwt = {
    tokenizeUser: function(req, res, next) {
      userRepo.getUserbyEmail(req.body.email, function(err, user, fields) {
        if(err) { return next(err); }
        if(!user) {
          return res.error(404);
        }

        // If a user is found with the email
        var token = jwt.encode(user, config.secret);

        res.return(token, 'data', "JWT token to place on header for authorization");
      })
    }
  }
  return jwt;
}
