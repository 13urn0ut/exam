const { param } = require("express-validator");
const { Item } = require("../models");

exports.checkItemId = [
  param("id")
    .isInt()
    .withMessage("Invalid id")
    .custom(async (id, { req }) => {
      const item = await Item.findByPk(id);

      if (!item) {
        throw new Error("Item not found");
      }

      if (item.creatorId !== req.user.id && req.user.role !== "admin") {
        throw new Error("You are not the creator of this item");
      }

      return true;
    }),
];
