const { param, checkExact } = require("express-validator");
const { User } = require("../models");

exports.checkUserId = [
  param("id")
    .isInt()
    .withMessage("Invalid id")
    .custom(async (id) => {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("User not found");
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
        .join("; "),
  }),
];
