const mongoose = require("mongoose");

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        item: String,
        quantity: "Double",
        measurement: String,
      },
    ],
    steps: { type: [String] },
    author: {
      id: mongoose.Schema.Types.ObjectId,
      username: String,
      required: true,
    },
    public: { type: Boolean, default: false },
    likeCount: { type: mongoose.Schema.Types.Int32, default: 0 },
    dislikeCount: { type: mongoose.Schema.Types.Int32, default: 0 },
  },
  { timestamps: true }
);

const recipe = mongoose.model("recipe", recipeSchema);

module.exports = recipe;
