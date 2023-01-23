const { body } = require("express-validator");

module.exports = [
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 10 }),
  body("username").isLength({ min: 3, max: 12 }),
  body("avatarUrl").optional().isURL(),
];
