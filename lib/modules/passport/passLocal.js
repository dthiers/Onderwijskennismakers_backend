/**
*
* LocalStategy used in PassportModule
*
* Passport is injected to bind the stategy to it
*
**/

module.exports = function(passport, userRepo){

  // userRepo @use: require credentials en check if it matches

  // Strategy
  var       LocalStategy  = require('passport-local').Strategy,
            bcrypt            = require('bcryptjs'),
            SALT_WORK_FACTOR  = 10,
            jwt               = require('jwt-simple');

  passport.use(new LocalStategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    var sql = 'SELECT * FROM  `user` WHERE `email` = ' + userRepo.pool.escape(email);

    userRepo.pool.query(sql, function(err, user, fields) {

      // If error
      if (err) { console.log("WE DOEN IETS FOUT IN DE DATABASE"); return done(err); }

      // If no user is found with email
      if(!user[0]){
        return done(null, false, { message: 'Incorrect email.' });
      }
      // Match password
      bcrypt.compare(password, user[0].password, function(err, isMatch) {
        if(err) { return done(null, false, { message: 'Incorrect password' }) };
            console.log(password + "  " + isMatch);
            if (isMatch){

                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Incorrect password.' });
            }

      })
    })

  }
))

  passport.serializeUser(function(user, done) {
    done(null, user);
  })

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

  return {
    // Authenticate a user.
    authUserMiddleware: function(req, res, next) {
      // if(typeof req.get('x-email') === 'undefined' || req.get('x-user') === 'undefined'){
      //     res.returnErr(401);
      // } else {
      //     req.body.email = req.get('x-email');
      //     req.body.password = req.get('x-password');
      //     next();
      // }
      next();
    }

  }


}
