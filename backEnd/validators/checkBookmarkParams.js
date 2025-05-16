const { param } = require("express-validator");
const { Bookmark } = require("../models");

exports.checkBookmarkId = [
  param("id")
    .isInt()
    .withMessage("Invalid id")
    .custom(async (id) => {
      const bookmark = await Bookmark.findByPk(id);

      if (!order) {
        throw new Error("Order not found");
      }

      return true;
    }),
];
