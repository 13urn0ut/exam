const { param } = require("express-validator");
const { Review } = require("../models");

exports.checkReviewId = [
  param("id")
    .isInt()
    .withMessage("Invalid id")
    .custom(async (id) => {
      const review = await Review.findByPk(id);

      if (!review) {
        throw new Error("Review not found");
      }

      return true;
    }),
];
