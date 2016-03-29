// Schema for users
module.exports = function(mongoose){

  // Database
  var Schema = mongoose.Schema;

  // Schema maken
  var userSchema = new Schema({
    name: {
      first:    { type: String, required: true},
      prefix:   { type: String, required: false},
      last:     { type: String, required: true}
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(email) {
          var emailRegex = '/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/';
          return emailRegex.test(email);
        }
      }
    },
    password:       {
      type: String,
      required: true,
      validate: {
        validator: function(v){
          return v.length >= 6
        },
        message: 'Password must contain 6 or more characters'
      }
    },
    createdAt:      { type: Date, required: true },
    lastUpdate:     { type: Date}
  })

  // Return model from Schema
  return mongoose.model('User', userSchema);


}
