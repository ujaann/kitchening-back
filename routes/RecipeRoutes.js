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
const { authenticateToken } = require("../security/auth");
const router = express.Router();

router.get("/", getAllRecipes);

router.get("/:id", getSingleRecipe);

router.post("/", createRecipe);

router.delete("/:id", authenticateToken,deleteRecipe);

router.put("/:id", authenticateToken,updateRecipe);

router.post("/uploadImage",
   authenticateToken,
  uploadRecipeImage, uploadImage);

router.get("/getRecipeImage/:imageName",getImage);

// router.

module.exports = router;
