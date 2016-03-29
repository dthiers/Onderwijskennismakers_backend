// Schema for schools
module.exports = function(mongoose){

  // Schema
  var Schema = mongoose.Schema;

  // Schema maken
  var tagSchema = new Schema({
    // Impliciet wordt _id naar Schema.ObjectId
    name:             { type: String, required: true },
    description:      { type: String },
    createdAt:        { type: Date, required: true },
    lastUpdate:       { type: Date, default: Data.now },
    creator_id:       { type: ObjectId, required: true }

  })

  // TODO: logo

  // Return model from Schema
  return mongoose.model('Tag', tagSchema);


}
