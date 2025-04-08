// const router = require("express").Router();
const userRoutes = require("express").Router();

userRoutes.get("/login", (req, res) => {
  res.render("login", { username: "", errors: {} });       //username and errors passed
});

userRoutes.get("/", (req, res) => {
  res.render("register", { errors: [] });                                //show views/register.ejs
});

userRoutes.get("/register", (req, res) => {
  res.render("register", { errors: [] });                                //show views/register.ejs
});


module.exports = userRoutes;

//in this file we are telling which ejs file to ernder