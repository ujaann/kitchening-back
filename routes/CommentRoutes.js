const express=  require('express');
const router = express.Router();

const {createComment,
    deleteComment,
    updateComment,
    getAllComments,}=require('../controllers/CommentController');
const { authenticateToken } = require('../security/auth');

router.get("/recipe/:recipeId",getAllComments);
router.post("/recipe/:recipeId",authenticateToken,createComment);
router.delete("/",authenticateToken,deleteComment); 
router.patch("/:commentId",authenticateToken,updateComment);

module.exports=router;