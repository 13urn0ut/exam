const { body, checkExact } = require("express-validator");
const { User } = require("../models/userModel");

exports.checkSignupBody = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  body("password").trim().notEmpty().isLength({ min: 8, max: 20 }),

  body("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  checkExact([], {
    message: (fields) =>
      fields
        .map(
          (field) =>
            `Unknown field ${field.path} in ${field.location} with value ${field.value}`
        )
        .join(", "),
  }),
];
