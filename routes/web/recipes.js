const express = require("express")
const router = express.Router()

router.get("/recipes", (req, res) => {
    res.render("recipes")
})

module.exports = router

//in this file we are telling to use recipes.ejs when user goes to /recipes