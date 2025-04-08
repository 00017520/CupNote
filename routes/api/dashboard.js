const express = require("express");
const authMiddleware = require("../../middleware/middleware");

const dashboardapiRoutes = express.Router();

dashboardapiRoutes.get("/", authMiddleware, (req, res) => {
  res.json({
    user: {
      id: req.userId,
      username: req.user.username,
    },
    recipes: req.recipes,
    errors: [],
  });
});

module.exports = dashboardapiRoutes;
