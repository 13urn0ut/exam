const { body, checkExact } = require("express-validator");
const argon2 = require("argon2");
const { User } = require("../models/userModel");
const AppError = require("../utils/appError");

exports.checkSignupBody = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be at least 8 characters long"),

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

exports.checkLoginBody = [
  body("email").trim().notEmpty().isEmail().withMessage("Invalid email"),

  body("password")
    .trim()
    .notEmpty()
    .custom(async (password, { req }) => {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user || !(await argon2.verify(user.password, password))) {
        throw new AppError("Incorrect email or password", 401);
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

exports.checkUpdateUserBody = [
  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (user && user.id !== req.user.id) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  body("oldPassword").custom(async (value, { req }) => {
    const user = await User.findByPk(req.params.id);

    if (!user || !(await argon2.verify(user.password, value))) {
      throw new AppError("Incorrect password", 401);
    }
    return true;
  }),

  body("newPassword")
    .trim()
    .optional()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be at least 8 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.newPasswordConfirm) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("newPasswordConfirm").optional(),

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
