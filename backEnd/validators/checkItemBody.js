const { body, checkExact } = require("express-validator");
const { Item } = require("../models");

exports.checkCreateItemBody = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Item name is required")
    .custom(async (value) => {
      const item = await Item.findOne({ where: { name: value } });

      if (item) {
        throw new Error("Item name already exists");
      }
      return true;
    }),

  body("price").trim().notEmpty().withMessage("Item price is required"),

  body("categoryId").trim().isInt().withMessage("Item category is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Item description is required"),

  body("image").trim().notEmpty().withMessage("Item image is required"),

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

exports.checkUpdateItemBody = [
  body("name")
    .trim()
    .optional()
    .custom(async (value, { req }) => {
      const item = await Item.findOne({ where: { name: value } });

      console.log(item.id, req.params.id);

      if (item && item.id !== +req.params.id) {
        throw new Error("Item name already exists");
      }
      return true;
    }),

  body("price").trim().optional(),

  body("categoryId").trim().optional(),

  body("description").trim().optional(),

  body("blocked").trim().optional(),

  body("image").trim().optional(),

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
