const { body, checkExact } = require("express-validator");
const { Review } = require("../models");
const { Item } = require("../models");

exports.checkCreateReviewBody = [
  body("comment")
    .trim()
    .isString({ min: 1, max: 200 })
    .withMessage("Review comment is required"),

  body("rating")
    .trim()
    .isInt({ min: 1, max: 5 })
    .withMessage("Review rating is required"),

  body("itemId")
    .trim()
    .isInt()
    .withMessage("Item id is required")
    .custom(async (itemId, { req }) => {
      const item = await Item.findByPk(itemId);

      if (!item) {
        throw new Error("Item not found");
      }

      const review = await Review.findOne({
        where: { itemId, userId: req.user.id },
      });

      if (review) {
        throw new Error("Item already reviewed");
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

exports.checkUpdateReviewBody = [
  body("comment")
    .trim()
    .optional()
    .isString({
      min: 1,
      max: 200,
    })
    .withMessage("Review comment must be a string"),

  body("rating")
    .trim()
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Review rating must be an integer"),

  body("itemId")
    .trim()
    .isInt()
    .withMessage("Item id must be an integer")
    .custom(async (itemId) => {
      const item = await Item.findByPk(itemId);

      if (!item) {
        throw new Error("Item not found");
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
