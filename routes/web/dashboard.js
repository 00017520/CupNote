const express = require("express");
const authMiddleware = require("../../middleware/middleware");
const db = require("../../database/db");

const dashboardwebRoutes = express.Router();

dashboardwebRoutes.get("/", authMiddleware, (req, res) => {
  db.all(
    "SELECT * FROM recipes WHERE user_id = ?",
    [req.user.id],
    (err, recipes) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching recipes");
      }

      // console.log("dashboardwebRoutes", req.user);
      // console.log("dashboardwebRoutes", recipes);
      
      res.render("dashboard", {
        user: req.user,
        recipes: recipes,
        errors: []
      });
    }
  );
});

dashboardwebRoutes.get("/edit/:id", authMiddleware, (req, res) => {
  const recipeId = req.params.id;


  db.get("SELECT * FROM recipes WHERE id = ? AND user_id = ?", [recipeId, req.user.id], (err, recipe) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }

    res.render("editRecipe", { recipe , errors: [] } );
  });
});

module.exports = dashboardwebRoutes;




// //in this file we are telling to use recipes.ejs when user goes to /recipes



