const express = require('express');
const recipeModel = require('../models/Recipe');
const { createRecipe, getSingleRecipe, getAllRecipes } = require('../controllers/RecipeController');
const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getSingleRecipe);

router.post('/', createRecipe);

router.delete('/:id', (req, res) => {
    res.json({ message: "DELETE a recipe" });
});

router.put('/:id', (req, res) => {
    res.json({ message: "UPDATE a recipe" });
});

module.exports = router;