const express=require('express');
const { getAllRatingsForUser, getAllRatingsForRecipe, createRating, deleteRating, toggleRatingForRecipe }=require('../controllers/RatingController');
const router = express.Router();

router.get("/user/:userId", getAllRatingsForUser);
router.get("/recipe/:recipeId", getAllRatingsForRecipe);

router.post("/recipe/:recipeId", createRating);
router.delete("/:id", deleteRating);
router.patch("/recipe/:recipeId", toggleRatingForRecipe);

module.exports = router;