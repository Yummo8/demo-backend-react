const { body } = require("express-validator");

module.exports = [body("text").isLength({ min: 3, max: 100 }).isString()];
