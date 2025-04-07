const express = require("express");
const routes = express.Router();

const recipeRoutes = require("./recipes");
const userRoutes = require("./users");  //for login and register

routes.use("/recipes", recipeRoutes);
routes.use("/", userRoutes);

module.exports = routes;