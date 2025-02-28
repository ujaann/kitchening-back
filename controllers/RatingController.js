const mongoose = require("mongoose");
const ratingModel = require("../models/Rating");
const recipeModel = require("../models/Recipe");
const catchErrors = require("../utils/catchErrors");
const {
    NOT_FOUND,
    OK,
    INTERNAL_SERVER_ERROR,
  } = require("../utils/constants/http");

//get all ratings
const getAllRatingsForUser = catchErrors(async (req, res) => {
    const { userId } = req.params;

    try {
        const ratings = await ratingModel.find({ "user.id": userId }).sort({ createdAt: -1 });
        if (!ratings) {
            return res.status(NOT_FOUND).json({ message: "No ratings found for this user." });
        }
        res.status(OK).json(ratings);
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});
//get all ratings for a recipe
const getAllRatingsForRecipe = catchErrors(async (req, res) => {
    const { recipeId } = req.params;

    try {
        const ratings = await ratingModel.find({ "recipe.id": recipeId }).sort({ createdAt: -1 });
        if (!ratings) {
            return res.status(NOT_FOUND).json({ message: "No ratings found for this recipe." });
        }
        res.status(OK).json(ratings);
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

//create a rating
const createRating = async (req, res) => {
    const { recipeId } = req.params;
    const { userId } = req.body;
    try {
        const newRating = new ratingModel({ user: { id: userId }, recipe: recipeId });
        const result = await newRating.save();
        res.status(OK).json(result);
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

//delete a rating
const deleteRating = catchErrors(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such rating" });
    }
    const rating = await ratingModel.findOneAndDelete({ _id: id });
    if (!rating) {
        return res.status(404).json({ error: "No such rating" });
    }
    res.status(OK).json(rating);
});

//TODO:LIKE A RECIPE
const toggleRatingForRecipe = catchErrors(async (req, res) => {
    const { recipeId } = req.params;
    const { userId, username, } = req.body;
    console.log(req.body);
  
    //check if valid id is passed
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(404).json({ error: "No such recipe" });
    }
    //check if recipe exists
    const recipe = await recipeModel.findById(recipeId);
    //check if user has already rated the recipe
    const rating = await ratingModel.findOne({
      "recipe.id": recipe._id,
      "user.id": userId,
    });
  
    //if recipe does not exist
    if (!recipe) {
      return res.status(404).json({ error: "No such recipe" });
    }
    //if user has not rated the recipe
    if (!rating) {
      await ratingModel.create({
        recipe: {id: recipe._id, title: recipe.title},
        user: { id: userId, usename: username },
      });
      recipe.likeCount += 1;
      await recipe.save();
      return res.status(OK).json({
        recipe: recipe.title,
        likeCount: recipe.likeCount,
      });
    } else {
      //if user has disliked the recipe
      recipe.likeCount -= 1;
      await rating.deleteOne();
      await recipe.save();
      return res.status(OK).json({
        recipe: recipe.title,
        likeCount: recipe.likeCount,
      });
    }
  });
  

module.exports = {
    getAllRatingsForUser,
    getAllRatingsForRecipe,
    createRating,
    deleteRating,
    toggleRatingForRecipe,
};