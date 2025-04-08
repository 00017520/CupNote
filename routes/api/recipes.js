const express = require("express");
const db = require("../../database/db");
const authMiddleware = require("../../middleware/middleware"); 
const {recipeValidation }= require("../../validator")
// const { validationResult } = require("express-validator");

const recipesapiRoutes = express.Router();

//add recipe
recipesapiRoutes.post("/", authMiddleware, recipeValidation(), async (req, res) => {
  // const errors = validationResult(req);
  const { title, ingredients, content, rating } = req.body;
  const userId = req.user.id;

  if (!userId) return res.redirect("/login");

  // console.log(req.body);
  
  // if (!errors.isEmpty()) {
  //   return res.render("dashboard", {
  //     errors: errors.array(),
  //     title,
  //     ingredients,
  //     content,
  //     rating
  //   });
  // }


  db.run(
    "INSERT INTO recipes (user_id, title, ingredients, content, rating) VALUES (?, ?, ?, ?, ?)",
    [userId, title, ingredients, content, rating],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error uploading recipe.");
      }

      console.log(`Recipe "${title}" added by user ${userId}`);
      res.redirect("/dashboard");
    }
  );
});

//update recipe
recipesapiRoutes.post("/:id", authMiddleware, recipeValidation(), async (req, res) => {
  const recipeId = req.params.id;
  const { title, ingredients, content, rating } = req.body;
  const userId = req.user.id;

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.render("dashboard", {
  //     errors: errors.array(),
  //     title,
  //     ingredients,
  //     content,
  //     rating
  //   });
  // }

  db.run(
    "UPDATE recipes SET user_id = ?, title = ?, ingredients = ?, content = ?, rating = ? WHERE id = ?",
    [userId, title, ingredients, content, rating, recipeId],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error updating recipe.");
      }

      res.redirect("/dashboard");
    }
  );
});

//delete recipe
recipesapiRoutes.post("/:id/delete", authMiddleware, async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  db.run(
    "DELETE FROM recipes WHERE id = ? AND user_id = ?",
    [recipeId, userId],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Error deleting recipe.");
      }

      console.log(`Recipe with ID ${recipeId} deleted by user ${userId}`);
      res.redirect("/dashboard");
    }
  );
});

module.exports = recipesapiRoutes;
