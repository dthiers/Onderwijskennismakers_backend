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
        ExtractJwt = require('passport-jwt').ExtractJwt;
        
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: 'secret'
    }
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        console.log("tieten");
        console.log(jwt_payload);
        console.log("tieten");
        done(null, false);
    }));
    
    
}