const router = require("express").Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const db = require("../../database/db");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login", { username: "", errors: {} });                 //username and errors passed
});


router.get("/register", (req, res) =>{
    res.render("register",{errors:[]})                       //show views/register.ejs                               
})

router.use(cookieParser())
router.get("/dashboard", (req, res) => {
  const token= req.cookies.token;
  let userId="";
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    userId = decoded.id;
  });
  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, user) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Error fetching user data" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.render("dashboard", user)
  })
})


module.exports = router;  

//in this file we are telling which ejs file to ernder