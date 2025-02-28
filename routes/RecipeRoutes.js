const express = require("express");
const {
  createRecipe,
  getSingleRecipe,
  getAllRecipes,
  deleteRecipe,
  updateRecipe,
  
  uploadImage,
  getImage,
} = require("../controllers/RecipeController");
const { uploadRecipeImage } = require("../middleware/upload");
const router = express.Router();

router.get("/", getAllRecipes);

router.get("/:id", getSingleRecipe);

router.post("/", createRecipe);

router.delete("/:id", deleteRecipe);

router.put("/:id", updateRecipe);

router.post("/uploadImage", uploadRecipeImage, uploadImage);

router.get("/getRecipeImage/:imageName",getImage);

// router.

module.exports = router;
