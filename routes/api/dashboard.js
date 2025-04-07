const express = require("express");
const db = require("../../database/db");
const authMiddleware = require("../../middleware/middleware"); 
const jwt = require("jsonwebtoken");
const dashboardRoutes = express.Router();


dashboardRoutes.get("/", authMiddleware, (req, res) => {
  const token = req.cookies.token; 
  let userId;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.decode(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    userId = decoded.id; 
  });
  
  
  
  const sql = "SELECT * FROM users WHERE id = ?";
  db.get(sql, [userId], (err, user) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Error fetching user data" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user)
    res.render("dashboard",user);
  });
});

module.exports = dashboardRoutes;
