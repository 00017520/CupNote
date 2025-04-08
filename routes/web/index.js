const express = require("express");
const webRoutes = express.Router();

const userRoutes = require("./users");           //for login and register
const dashboardwebRoutes = require("./dashboard");       //for dashboard

webRoutes.use("/dashboard", dashboardwebRoutes);    //get for dashboard
webRoutes.use("/", userRoutes);

module.exports = webRoutes;