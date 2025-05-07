const { body, checkExact } = require("express-validator");

exports.checkSignupBody = [
  body("email").trim().notEmpty().isEmail().normalizeEmail(),
  body("password").trim().notEmpty().isLength({ min: 8, max: 20 }),

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
