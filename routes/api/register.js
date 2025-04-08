const express = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../../database/db");
const { authValidation } = require("../../validator");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const registerRoutes = express.Router();


//register
registerRoutes.post("/", authValidation(), async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('register', {errors: errors.array() });
  } 

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render("register", {
        errors: [{ msg: "Username and password are required" }],
      });
    }

    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, existingUser) => {
        if (err) {
          return res.status(500).send("Error checking existing user");
        }
        if (existingUser) {
          return res.render("register", {
            errors: [
              { msg: "Username already exists, please try differnt one" },
            ],
          });
        }

        const hashedPassword = await bcrypt.hash(password, 6);


        db.run(
          "INSERT INTO users (username, password) VALUES (?, ?)",
          [username, hashedPassword],
          function (err) {
            if (err) {
              console.error(err.message);
              return res.status(500).send("Error registering user");
            }

            const token = jwt.sign({ id: this.lastID }, process.env.JWT_SECRET, {
              expiresIn: "6h",
            });
            res.cookie("token", token, { httpOnly: true });

            res.redirect("/dashboard");
          }
        );
      }
    );
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error registering user frontend");
  }
});



module.exports = registerRoutes;
