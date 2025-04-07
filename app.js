require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const db = require("./database/db");
const path = require("path");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

//we are telling express to use ejs files as htmls
app.set("view engine", "ejs");
app.set("views","./views");


//server managment
const routes = require("./routes");
app.use("/", routes);

//db connection
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//accesing cookie for token
app.use(cookieParser());

//teling to use public folder for style
// app.use("/css", express.static("./public/styles/style.css"))
app.use(express.static('public'));


//port showing
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`)); 