const { query, checkExact } = require("express-validator");
const { Review } = require("../models");

exports.checkReviewQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page")
    .custom(async (value, { req }) => {
      const totalRevies = await Review.count();
      if (
        value > Math.ceil(totalRevies / (req.query.limit || 10)) &&
        +value !== 1
      ) {
        throw new Error("Invalid page");
      }
      return true;
    }),

  query("limit").optional().isInt({ min: 1 }).withMessage("Invalid limit"),

  query("orderBy")
    .optional()
    .isIn(["createdAt", "price", "duration", "rating", "name"])
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
