const apiRoutes = require("express").Router();


const loginRoutes = require("./login");
const registerRoutes = require("./register");
const dashboardapiRoutes = require("./dashboard");
const recipesapiRoutes = require("./recipes");

apiRoutes.use("/login", loginRoutes);
apiRoutes.use("/register", registerRoutes);
apiRoutes.use("/dashboard", dashboardapiRoutes);//need to change
apiRoutes.use("/recipe", recipesapiRoutes);



module.exports = apiRoutes;

//in this page we are telling express to use which api route when