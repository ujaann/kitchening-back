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
    cuisine:String,
    ingredients: [
      {
        item: String,
        quantity: "Double",
        measurement: String,
      },
    ],
    steps: { type: [String] },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      username: String,
    },
    public: { type: Boolean, default: false },
    likeCount: { type: mongoose.Schema.Types.Int32, default: 0 },
    image: {
      type: String,
      required: false,
    },  
  },
  { timestamps: true }
);

const recipe = mongoose.model("recipe", recipeSchema);

module.exports = recipe;
