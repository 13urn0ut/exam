const { Review } = require("../models");
const { Item } = require("../models");
const AppError = require("../utils/appError");

exports.getAllReviews = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "DESC",
  } = req.query;

  try {
    const reviews = await Review.findAll({
      page,
      limit,
      order: [[orderBy, order]],
      include: [{ model: Item }],
    });
    const results = await Review.count();

    res.status(200).json({ status: "success", results, data: reviews });
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

exports.getReviewsByUser = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "DESC",
  } = req.query;

  try {
    const { id: userId } = req.params;
    const reviews = await Review.findAll({
      where: { userId },
      include: [{ model: Item }],
      page,
      limit,
      order: [[orderBy, order]],
    });
    const results = await Review.count({ where: { userId } });

    res.status(200).json({ status: "success", results, data: reviews });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getReviewsByItem = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "DESC",
  } = req.query;

  try {
    const { id: itemId } = req.params;

    const reviews = await Review.findAll({
      where: { itemId },
      include: [{ model: Item }],
      page,
      limit,
      order: [[orderBy, order]],
    });
    const results = await Review.count({ where: { itemId } });

    res.status(200).json({ status: "success", results, data: reviews });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { itemId, rating, comment } = req.body;

    const newReview = await Review.create({ userId, itemId, rating, comment });

    const item = await Item.findByPk(newReview.itemId);

    const [avgRating] = await Review.findAll({
      attributes: [
        [Review.sequelize.fn("AVG", Review.sequelize.col("rating")), "rating"],
      ],
      where: { itemId: item.id },
      raw: true,
    });

    await item.update(avgRating);

    res.status(201).json({ status: "success", data: newReview });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    await review.update(req.body);

    console.log(review.itemId);

    const item = await Item.findByPk(review.itemId);

    console.log(item.id);

    const [avgRating] = await Review.findAll({
      attributes: [
        [Review.sequelize.fn("AVG", Review.sequelize.col("rating")), "rating"],
      ],
      where: { itemId: item.id },
      raw: true,
    });

    console.log(avgRating);

    await item.update(avgRating);

    res.status(200).json({ status: "success", data: review });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    await review.destroy();

    const item = await Item.findByPk(review.itemId);

    const [avgRating] = await Review.findAll({
      attributes: [
        [Review.sequelize.fn("AVG", Review.sequelize.col("rating")), "rating"],
      ],
      where: { itemId: item.id },
      raw: true,
    });

    await item.update({ rating: avgRating.rating || 0 });

    res.status(200).json({ status: "success", data: review });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
