/**
*
* PassportModule.
*
* TODO: include passJWT, passFacebook, passLinkedIn\
*
* TODO: inject Databse to require user table
*
**/


module.exports = function(passport, userRepo, app){

  app.use(passport.initialize());

  // Stategy instances
  var LocalStategy = require('./passLocal')(passport, userRepo);      // Require all strategies here
  var JwtStrategy = require('./passJwt')(passport, userRepo);
  
  
  

  //console.log(passport);

}
