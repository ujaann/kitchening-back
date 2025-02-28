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
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipe",
    required: true,
  },
});

const rating = mongoose.model("rating", ratingSchema);

module.exports = rating;
