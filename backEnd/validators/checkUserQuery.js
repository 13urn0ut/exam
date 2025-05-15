const { query, checkExact } = require("express-validator");
const { User } = require("../models");

exports.checkUserQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page")
    .custom(async (value, { req }) => {
      const totalUsers = await User.count();
      if (value > Math.ceil(totalUsers / req.query.limit)) {
        throw new Error("Invalid page");
      }
      return true;
    }),

  query("limit").optional().isInt({ min: 1 }).withMessage("Invalid limit"),

  query("orderBy")
    .optional()
    .isIn(["createdAt", "email"])
    .withMessage("Invalid orderBy"),

  query("order")
    .optional()
    .toLowerCase()
    .isIn(["asc", "desc"])
    .withMessage("Invalid order"),

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
