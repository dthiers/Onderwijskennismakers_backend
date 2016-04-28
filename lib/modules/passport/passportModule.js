/**
*
* PassportModule.
*
* TODO: include passJWT, passFacebook, passLinkedIn\
*
* TODO: inject Databse to require user table
*
**/


module.exports = function(passport, userRepo, app, config){
  var self = this;

  app.use(passport.initialize());

  // Stategy instances
  self.LocalStategy  = require('./passLocal')(passport, userRepo),      // Require all strategies here
  self.JwtStrategy   = require('./passJwt')(passport, userRepo, config.secret);

  passport.serializeUser(function(user, done) {
    done(null, user);
  })

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

  console.log(self.JwtStrategy.jwt);
  return self;
}
