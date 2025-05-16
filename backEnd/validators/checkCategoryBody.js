const { body, checkExact } = require("express-validator");
const { Category } = require("../models");

exports.checkCreateCategoryBody = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .custom(async (value) => {
      const category = await Category.findOne({ where: { name: value } });

      if (category) {
        throw new Error("Category name already exists");
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

exports.checkUpdateCategoryBody = [
  body("name")
    .trim()
    .optional()
    .custom(async (value, { req }) => {
      const category = await Category.findOne({ where: { name: value } });

      if (category && category.id !== +req.params.id) {
        throw new Error("Category name already exists");
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
