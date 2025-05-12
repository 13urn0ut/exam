const { param } = require("express-validator");
const { Item } = require("../models");

exports.checkItemId = [
  param("id")
    .isInt()
    .withMessage("Invalid id")
    .custom(async (id) => {
      const item = await Item.findByPk(id);

      if (!item) {
        throw new Error("Item not found");
      }

      return true;
    }),
];
