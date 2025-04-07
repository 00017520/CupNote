const routes = require("express").Router();


const loginRoutes = require("./login");
const registerRoutes = require("./register");
const dashboardRoutes = require("./dashboard");

routes.use("/login", loginRoutes);
routes.use("/register", registerRoutes);
routes.use("/dashboard", dashboardRoutes);



module.exports = routes;

//in this page we are telling express to use which api route when