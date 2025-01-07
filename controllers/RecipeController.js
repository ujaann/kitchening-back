const recipeModel = require('../models/Recipe');
const mongoose = require('mongoose');

//get all recipes (public) 
const getAllRecipes = async (req, res) => {
    const recipes = await recipeModel.find().sort({ createdAt: -1 });
    res.status(200).json(recipes);
}

//get a single recipe
const getSingleRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such recipe" });
    }
    const foundRecipe = await recipeModel.findById(id);
    if (!foundRecipe) {
        return res.status(404).json({ error: "No such recipe" });
    }
    res.status(200).json(foundRecipe);
}

//create a new recipe
const createRecipe = async (req, res) => {
    const { title, ingredients, steps, author } = req.body;
    //add doc to db
    try {
        const newRecipe = new recipeModel({ title, ingredients, steps, author });
        const result=await newRecipe.save();
        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a workout
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such recipe" });
    }
    const recipe = await recipeModel.findOneAndDelete({ _id: id });
    if (!recipe) {
        return res.status(404).json({ error: "No such recipe" });
    }
    res.status(200).json(recipe);
}

const updateRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such recipe" });
    }
    const updatedRecipe = req.body;
    if (!updatedRecipe) {
        return res.status(404).json({ error: "No such recipe" });
    }
    const oldRecipe = await recipeModel.findByIdAndUpdate(id, updatedRecipe);
    res.status(200).json(oldRecipe);
}

//update a workout

module.exports = { createRecipe, getAllRecipes, getSingleRecipe, deleteRecipe, updateRecipe }