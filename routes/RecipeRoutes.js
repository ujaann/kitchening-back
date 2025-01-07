const express = require('express');
const { createRecipe, getSingleRecipe, getAllRecipes, deleteRecipe, updateRecipe, } = require('../controllers/RecipeController');
const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getSingleRecipe);

router.post('/', createRecipe);

router.delete('/:id', deleteRecipe);

router.put('/:id', updateRecipe);

module.exports = router;