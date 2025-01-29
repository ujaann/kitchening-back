const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const recipeRoutes = require("./routes/RecipeRoutes");
const connectDB = require("./config/db");

const app = express();

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App running in port: ${PORT}`);
  });
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);
