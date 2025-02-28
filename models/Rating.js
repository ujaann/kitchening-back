const mongoose = require("mongoose");

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const ratingSchema = mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    username: String,
  },
  recipe: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "recipe", required: true },
    title: String,
  },
});

const rating = mongoose.model("rating", ratingSchema);

module.exports = rating;
