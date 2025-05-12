const reviewRouter = require("express").Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect, allowAccessTo } = require("../controllers/userController");
const {
  checkCreateReviewBody,
  checkUpdateReviewBody,
} = require("../validators/checkReviewBody");
const { checkReviewId } = require("../validators/checkReviewParams");
const validate = require("../validators/validate");

reviewRouter.route("/").get(getAllReviews);
reviewRouter
  .route("/")
  .post(
    protect,
    allowAccessTo("user"),
    checkCreateReviewBody,
    validate,
    createReview
  );
reviewRouter
  .route("/:id")
  .get(checkReviewId, validate, getReviewById)
  .patch(
    protect,
    allowAccessTo("user"),
    checkUpdateReviewBody,
    validate,
    updateReview
  )
  .delete(
    protect,
    allowAccessTo("user"),
    checkReviewId,
    validate,
    deleteReview
  );

module.exports = reviewRouter;
