const { param } = require("express-validator");
const { Order } = require("../models");

exports.checkOrderId = [
  param("id")
    .isInt()
    .withMessage("Invalid id")
    .custom(async (id) => {
      const order = await Order.findByPk(id);

      if (!order) {
        throw new Error("Order not found");
      }

      return true;
    }),
];
