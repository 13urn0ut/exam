const { query } = require("express-validator");
const { Item } = require("../models");
const { Category } = require("../models");

exports.checkItemQuery = [
  query("name").optional().isString().withMessage("Invalid name"),

  query("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid minPrice"),

  query("maxPrice")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid maxPrice"),

  query("minRating")
    .optional()
    .isInt({ min: 0, max: 5 })
    .withMessage("Invalid minRating"),

  query("maxRating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Invalid maxRating"),

  query("categoryId")
    .optional()
    .isInt()
    .withMessage("Invalid categoryId")
    .custom(async (value) => {
      const category = await Category.findByPk(value);
      if (!category) {
        throw new Error("Category not found");
      }
      return true;
    }),

  query("minDuration")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid duration"),

  query("maxDuration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid duration"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page")
    .custom(async (value, { req }) => {
      const totalItems = await Item.count();

      if (value > Math.ceil(totalItems / (req.query.limit || 10))) {
        throw new Error("Invalid page");
      }
      return true;
    }),

  query("limit").optional().isInt().withMessage("Invalid limit"),

  query("orderBy")
    .optional()
    .isIn(["createdAt", "price", "duration", "rating", "name"])
    .withMessage("Invalid orderBy"),

  query("order")
    .optional()
    .toLowerCase()
    .isIn(["asc", "desc"])
    .withMessage("Invalid order"),
];
