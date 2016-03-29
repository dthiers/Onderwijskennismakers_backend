// Schema for schools
module.exports = function(mongoose){

  // Schema
  var Schema = mongoose.Schema;

  // Schema maken
  var communitySchema = new Schema({
    // Impliciet wordt _id naar Schema.ObjectId
    name:             { type: String, required: true},
    description:      { type: String, required: true },
    createdAt:        { type: Date, required: true, default: Date.now },
    lastUpdate:       { type: Date, required: true },
    users: [
      { type: Schema.ObjectId, ref: 'User' }
    ]
  })

  // Return model from Schema
  return mongoose.model('Community', communitySchema);


}
