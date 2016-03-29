// Schema for schools
module.exports = function(mongoose){

  // Schema
  var Schema = mongoose.Schema;

  // Schema maken
  var schoolSchema = new Schema({
    // Impliciet wordt _id naar Schema.ObjectId
    name: {
      full: { type: String, required: true },
      abbreviation: { type: String }
    },
    description:      { type: String },
    createdAt:        { type: Date, required: true },
    lastUpdate:       { type: Date, default: Date.now },
    principal_id:     { type: Schema.ObjectId, required: true }

  })

  // TODO: logo

  // Return model from Schema
  return mongoose.model('School', schoolSchema);


}
