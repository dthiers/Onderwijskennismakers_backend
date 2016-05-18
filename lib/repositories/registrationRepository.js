/**
*
* firstName
* lastName
* email
* password
* functionDescription
* profileImage (profile image get sent to API, APi should send this to imgur API)
* isAdmin: 0
* isFrozen: 0
*
* TODO:
* instelling
*   bereikbaarheid
* social media
* mail
* telefoon
* skype
*
*
*
*
*
**/

module.exports = function(pool) {

  var baseRepo          = require('./baseRepository')(pool, "user"),
      bcrypt            = require('bcryptjs');
      SALT_WORK_FACTOR  = 10;

  return {
    /**
    *
    * Register a user + hash its password using the hashHandler
    *
    **/
    test: function(req, res, next) {
      res.json('Test from registrationRepo to see if route is functional');
    },
    registerUser: function(req, res, next) {

      var sql = "INSERT INTO `user` SET ?";

      // ugly code, je sais. Chaining not possible
      req.body.isAdmin = 0;
      req.body.isFrozen = 0;
      req.body.createdAt = baseRepo.getDateNow();
      req.body.lastUpdate = baseRepo.getDateNow();

      /**
      * Generate a salted hash for the user's password.
      **/
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) { console.log(err); return next(err); }
        else {
          /**
          * Generate hash
          **/
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err) { console.log(err); return next(err); }
            else {
              /**
              * If hash is generated return this to the registration route
              **/
              req.body.password = hash;
              pool.query(sql, req.body, function(err){
                if(err) { console.log(err); return next(err); }
                else{
                  res.json("Succesfully created an entity in the table user");
                }
              })

            }
          })
        }
      })
    }
  }









}
