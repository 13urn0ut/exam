const itemRouter = require("express").Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { getReviewsByItem } = require("../controllers/reviewController");
const { getBookmarksByItem } = require("../controllers/bookmarkController");
const { protect, allowAccessTo } = require("../controllers/userController");
const {
  checkCreateItemBody,
  checkUpdateItemBody,
} = require("../validators/checkItemBody");
const { checkItemId } = require("../validators/checkItemParams");
const { checkItemQuery } = require("../validators/checkItemQuery");
const { checkReviewQuery } = require("../validators/checkReviewQuery");
const { checkBookmarkQuery } = require("../validators/checkBookmarkQuery");
const validate = require("../validators/validate");

itemRouter
  .route("/")
  .get(checkItemQuery, validate, getAllItems)
  .post(
    protect,
    allowAccessTo("user"),
    checkCreateItemBody,
    validate,
    createItem
  );

itemRouter
  .route("/:id")
  .get(checkItemId, validate, getItemById)
  .patch(
    protect,
    allowAccessTo("user", "admin"),
    checkItemId,
    checkUpdateItemBody,
    validate,
    updateItem
  )
  .delete(
    protect,
    allowAccessTo("admin", "user"),
    checkItemId,
    validate,
    deleteItem
  );

itemRouter
  .route("/:id/reviews")
  .get(checkItemId, checkReviewQuery, validate, getReviewsByItem);

itemRouter
  .route("/:id/bookmarks")
  .get(checkItemId, checkBookmarkQuery, validate, getBookmarksByItem);

module.exports = itemRouter;
