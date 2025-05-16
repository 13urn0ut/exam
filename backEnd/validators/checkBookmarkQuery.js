const { query, checkExact } = require("express-validator");
const { Bookmark } = require("../models");

exports.checkBookmarkQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page")
    .custom(async (value, { req }) => {
      const totalBookmarks = await Bookmark.count();
      if (
        value > Math.ceil(totalBookmarks / (req.query.limit || 10)) &&
        +value !== 1
      ) {
        throw new Error("Invalid page");
      }
      return true;
    }),

  query("limit").optional().isInt({ min: 1 }).withMessage("Invalid limit"),

  query("orderBy")
    .optional()
    .isIn(["createdAt"])
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
