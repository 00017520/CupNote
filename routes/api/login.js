const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../database/db");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
 
  const { username, password } = req.body;
 
  let errors = {};


  if (!username) {
    errors.username = "Username is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }


  if (Object.keys(errors).length > 0) {
    return res.json({ success: false, errors });
  }


  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Error checking user" });
    }
    if (!user) {
      return res.json({ success: false, errors: { username: "Username does not exist" } });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, errors: { password: "Incorrect password" } });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "6h" });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "Strict",
    });


    return res.status(200).json("succese");
  });
});

module.exports = router;

