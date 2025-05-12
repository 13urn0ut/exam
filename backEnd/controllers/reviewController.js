const { sequelize } = require("../DB/connectDB");
const { Review } = require("../models");
const { Item } = require("../models");
const AppError = require("../utils/appError");

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: [{ model: Item }] });
    res.status(200).json({ status: "success", data: reviews });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [{ model: Item }],
    });
    res.status(200).json({ status: "success", data: review });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { itemId, rating, comment } = req.body;
    const newReview = await sequelize.transaction(async () => {
      const review = await Review.create({ userId, itemId, rating, comment });

      const item = await Item.findByPk(itemId);

      const avgRating = await Review.findAll({
        where: { itemId },
        attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "rating"]],
      });

      await item.update({
        rating: avgRating,
      });

      return review;
    });

    res.status(201).json({ status: "success", data: newReview });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    await review.update(req.body);
    res.status(200).json({ status: "success", data: review });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    await review.destroy();
    res.status(200).json({ status: "success", data: review });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
