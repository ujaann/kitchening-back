const mongoose = require("mongoose");
const recipeModel = require("../models/Recipe");
const commentModel = require("../models/Comment");
const catchErrors = require("../utils/catchErrors");
const {
  NOT_FOUND,
  OK,
  INTERNAL_SERVER_ERROR,
} = require("../utils/constants/http");

const getAllComments = catchErrors(async (req, res) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(NOT_FOUND).json({ message: "Recipe not found" });
  }
  const recipe = await recipeModel.findById(recipeId);

  if (!recipe) {
    return res.status(NOT_FOUND).json({ message: "Recipe not found" });
  }

  const comments = await commentModel.find({ recipe: recipeId });

  res.status(OK).json(comments);
});

const createComment = catchErrors(async (req, res) => {
  const { recipeId } = req.params;
  const { userId, username, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(NOT_FOUND).json({ message: "Recipe not found" });
  }

  const recipe = await recipeModel.findById(recipeId);

  if (!recipe) {
    return res.status(NOT_FOUND).json({ message: "Recipe not found" });
  }

  const newComment = new commentModel({
    comment,
    user: { id: userId, username },
    recipe: recipeId,
  });
  const result = await newComment.save();

  res.status(OK).json(result);
});

const deleteComment = catchErrors(async (req, res) => {
    const { commentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(NOT_FOUND).json({ message: "Comment not found" });
    }

    const comment = await commentModel.findByIdAndDelete(commentId);

    if (!comment) {
        return res.status(NOT_FOUND).json({ message: "Comment not found" });
    }

    res.status(OK).json({ message: "Comment deleted successfully" });
});

const updateComment = catchErrors(async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(NOT_FOUND).json({ message: "Comment not found" });
    }


    const oldComment = await commentModel.findByIdAndUpdate(
        commentId,
        { comment },
        
    );

    if (!oldComment) {
        return res.status(NOT_FOUND).json({ message: "Comment not found" });
    }

    res.status(OK).json(oldComment);
});


module.exports = {
    getAllComments,
    createComment,
    deleteComment,
    updateComment,
};
