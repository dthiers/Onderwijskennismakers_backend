/**
*
*
* Module to handle hashing of password
*
* TODO: delete this module?
*
**/

module.exports = function(){
  var   self              = this,
        bcrypt            = require('bcryptjs'),
        SALT_WORK_FACTOR  = 10;


  // TODO: include this handler in the registration route

  self.generateHash = function(password) {

    /**
    * Generate salt
    **/
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) { console.log(err); return next(err); }
      else {
        /**
        * Generate hash
        **/
        bcrypt.hash(password, salt, function(err, hash) {
          if(err) { console.log(err); return next(err); }
          else {
            /**
            * If hash is generated return this to the registration route
            **/
            console.log(hash);
            return hash;
          }
        })
      }
    })
  }

  return self;
}
