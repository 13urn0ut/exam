const { param } = require("express-validator");
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
];
