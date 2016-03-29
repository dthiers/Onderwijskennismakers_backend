var mongoose = require('mongoose');
var config = require('../config/config');


require('./schemas/user')(mongoose);


// TODO: database Initalisation
mongoose.connect(config.db.connection, function(err) {
  if(err){
    console.log('DB error : ' + err );
  } else {
    console.log('Connected maat');
  }
})
