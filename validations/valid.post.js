const { body } = require("express-validator");

module.exports = [
  body("title").isLength({ min: 3, max: 50 }).isString(),
  body("text").isLength({ min: 3 }).isString(),
  body("imageUrl").optional().isString(),
];
