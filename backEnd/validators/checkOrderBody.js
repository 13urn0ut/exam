const { body, checkExact } = require("express-validator");
const { Order } = require("../models");
const { Item } = require("../models");

exports.checkCreateOrderBody = [
  body("itemId")
    .trim()
    .isInt()
    .withMessage("Item id is required")
    .custom(async (itemId, { req }) => {
      const item = await Item.findByPk(itemId);

      if (!item) {
        throw new Error("Item not found");
      }

      const order = await Order.findOne({
        where: { itemId, userId: req.user.id },
      });

      if (order) {
        throw new Error("Item already ordered");
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

exports.checkUpdateOrderBody = [
  body("itemId")
    .trim()
    .optional()
    .isInt()
    .withMessage("Item id is required")
    .custom(async (itemId, { req }) => {
      const item = await Item.findByPk(itemId);

      if (!item) {
        throw new Error("Item not found");
      }

      const order = await Order.findOne({
        where: { itemId, userId: req.user.id },
      });

      if (order) {
        throw new Error("Item already ordered");
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
