// Schema for schools
module.exports = function(mongoose){

  // Schema
  var Schema = mongoose.Schema;

  // Schema maken
  var fileSchema = new Schema({
    // Impliciet wordt _id naar Schema.ObjectId
    name:             { type: String, required: true},
    type:             { type: String, required: true },
    content:          { type: String, required: true},
    link:             { type: String },
    createdAt:        { type: Date, required: true, default: Date.now },
    lastUpdate:       { type: Date, required: true },
    user_id:          { type: Schema.ObjectId, required: true }

  })

  // Return model from Schema
  return mongoose.model('File', fileSchema);


}
