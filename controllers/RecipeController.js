const mongoose = require("mongoose");
const path = require("path");
const catchErrors = require("../utils/catchErrors");
const {
  NOT_FOUND,
  OK,
  INTERNAL_SERVER_ERROR,
} = require("../utils/constants/http");
const recipeModel = require("../models/Recipe");
const ratingModel = require("../models/Rating");

//get all recipes (public)
const getAllRecipes = catchErrors(async (req, res) => {
  const recipes = await recipeModel.find().sort({ createdAt: -1 });
  res.status(OK).json(recipes);
});

//get a single recipe
const getSingleRecipe = catchErrors(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).json({ error: "No such recipe" });
  }
  const foundRecipe = await recipeModel.findById(id);

  if (!foundRecipe) {
    return res.status(NOT_FOUND).json({ error: "No such recipe" });
  }
  res.status(OK).json(foundRecipe);
});

//create a new recipe
const createRecipe = async (req, res) => {
  const { title, ingredients, steps, author, cuisine,image } = req.body;
  //add doc to db
  try {
    const newRecipe = new recipeModel({
      title,
      ingredients,
      steps,
      author,
      cuisine,
      image,
    });
    const result = await newRecipe.save();
    res.status(OK).json(result);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

//delete a workout
const deleteRecipe = catchErrors(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }
  const recipe = await recipeModel.findOneAndDelete({ _id: id });
  const ratings = await ratingModel.find({ recipe: foundRecipe._id });
  ratings.forEach(async (rating) => {
    await rating.deleteOne();
  });
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  res.status(OK).json(recipe);
});

const updateRecipe = catchErrors(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such recipe" });
  }
  const updatedRecipe = req.body;
  if (!updatedRecipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  const oldRecipe = await recipeModel.findByIdAndUpdate(id, updatedRecipe);
  res.status(OK).json(oldRecipe);
});

const uploadImage = async (req, res) => {
  try {
    
    if (!req.file) {
      
      return res
        .status(BAD_REQUEST)
        .json({ message: "No files were uploaded." });
    } else {
      res.status(OK).json({ success: true, file: req.file.filename });
    }
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const getImage = catchErrors(async (req, res) => {
  const { imageName } = req.params;
  console.log(imageName);
  const filePath = path.join(__dirname, `../public/uploads/recipe/${imageName}`);
  console.log(filePath);
  res.sendFile(filePath);
});

//TODO:COMMENT ON A RECIPE

//TODO:DELETE A COMMENT
//TODO:GET ALL COMMENTS FOR A RECIPE
//TODO:GET POPULAR RECIPES/CATEGORY
//TODO:GET RECIPES BY AUTHOR

module.exports = {
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
  deleteRecipe,
  updateRecipe,
  uploadImage,
  getImage,
};
