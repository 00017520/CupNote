const { body } = require("express-validator");

const authValidation = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

const recipeValidation = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("Title must be at least 3 characters long"),

    body("ingredients")
      .notEmpty()
      .withMessage("Ingredients are required")
      .isLength({ min: 5 })
      .withMessage("Ingredients must be at least 5 characters long"),

    body("content")
      .notEmpty()
      .withMessage("Content is required")
      .isLength({ min: 10 })
      .withMessage("Content must be at least 10 characters long"),

    body("rating")
      .notEmpty()
      .withMessage("Rating is required")
      .isNumeric()
      .withMessage("Rating must be a number")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
  ];
};

module.exports = { authValidation, recipeValidation};
