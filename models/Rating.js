const mongoose = require("mongoose");

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const ratingSchema = mongoose.Schema({
  rating: { type: Boolean, required: true },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    username: String,
  },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "recipe" },
});


const rating=mongoose.model('rating',ratingSchema);

module.exports=rating;