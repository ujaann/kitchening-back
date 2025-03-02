const express = require("express");
const cors = require("cors");
const path = require('path');
const userRoutes = require("./routes/UserRoutes");
const recipeRoutes = require("./routes/RecipeRoutes");
const ratingRoutes = require("./routes/RatingRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App running in port: ${PORT}`);
  });
});

// ✅ Allow requests from your frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.static('public/uploads'));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});



app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/comment", commentRoutes);

app.use(errorHandler);
