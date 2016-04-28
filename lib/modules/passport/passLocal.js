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
  var LocalStategy = require('passport-local').Strategy;

  passport.use(new LocalStategy({
    usernameField: 'email'
  },
    function(email, password, done) {
      console.log("email: " + email);
      console.log("password: " + password);
      var sql = 'SELECT * FROM  `user` WHERE `email` = ' + userRepo.pool.escape(email);
      	console.log(sql);

      userRepo.pool.query(sql, function(err, user, fields) {

        // If error
          if (err) { console.log("WE DOEN IETS FOUT IN DE DATABASE"); return done(err); }

          // If no user is found with email
          if(!user){
            return done(null, false, { message: 'Incorrect email.' });
          }

          // If password doesn't match
          if(!(user[0].password === password)){
            return done(null, false, { message: 'Incorrect password' });
          }
          console.log(user);
          // If user found
          return done(null, user);
      })

    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user);
  })

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

}
