const routes = require("express").Router();
const apiRoutes= require("./api");
const webRoutes = require("./web");

routes.use("/api", apiRoutes);  //api routes helps to handlr reqs from user
routes.use("/", webRoutes);    //web routs renders pages to user (html css js)

module.exports = routes;