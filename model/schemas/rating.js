// Schema for schools
module.exports = function(mongoose){

  // Schema
  var Schema = mongoose.Schema;

  // Schema maken
  var ratingSchema = new Schema({
    // Impliciet wordt _id naar Schema.ObjectId
    value:            { type: String, required: true },
    createdAt:        { type: Date, required: true, default: Date.now },
    user_id:          { type: Schema.ObjectId, required: true },
    file_id:          { type: Schema.ObjectId, required: true}

  })

  // Return model from Schema
  return mongoose.model('Rating', ratingSchema);


}
