const express = require("express");
const router = express.Router();
const {
  findAll,
  findById,
  deleteById,
  update,
  register,
  login,
  uploadImage,
  getImage,
} = require("../controllers/UserController");
const { uploadProfileImage } = require("../middleware/upload");
const {authenticateToken}=require('../security/auth');

router.get("/", authenticateToken,findAll);

router.get("/:id", findById);

router.post("/register", register);

router.post("/login", login);

router.delete("/:id", authenticateToken,deleteById);

router.put("/:id", authenticateToken,update);

router.post("/uploadImage",uploadProfileImage, uploadImage);

router.get("/:id/getProfileImage", getImage);

module.exports = router;
