const { body, checkExact } = require("express-validator");
const { Bookmark } = require("../models");
const { Item } = require("../models");

exports.checkCreateBookmarkBody = [
  body("itemId")
    .trim()
    .isInt()
    .withMessage("Item id is required")
    .custom(async (itemId, { req }) => {
      const item = await Item.findByPk(itemId);

      if (!item) {
        throw new Error("Item not found");
      }

      const bookmark = await Bookmark.findOne({
        where: { itemId, userId: req.user.id },
      });

      if (bookmark) {
        throw new Error("bookmark already ordered");
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

exports.checkUpdateBookmarkBody = [
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

      const bookmark = await Bookmark.findOne({
        where: { itemId, userId: req.user.id },
      });

      if (bookmark) {
        throw new Error("bookmark already ordered");
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
