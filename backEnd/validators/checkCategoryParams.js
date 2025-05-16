const { param, checkExact } = require("express-validator");
const { Category } = require("../models");

exports.checkCategoryId = [
  param("id")
    .isInt()
    .withMessage("Invalid id")
    .custom(async (id) => {
      const category = await Category.findByPk(id);

      if (!category) {
        throw new Error("Category not found");
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
