const itemRouter = require("express").Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { getReviewsByItem } = require("../controllers/reviewController");
const { getOrdersByItem } = require("../controllers/orderController");
const { protect, allowAccessTo } = require("../controllers/userController");
const {
  checkCreateItemBody,
  checkUpdateItemBody,
} = require("../validators/checkItemBody");
const { checkItemId } = require("../validators/checkItemParams");
const { checkItemQuery } = require("../validators/checkItemQuery");
const { checkReviewQuery } = require("../validators/checkReviewQuery");
const { checkOrderQuery } = require("../validators/checkOrderQuery");
const validate = require("../validators/validate");

itemRouter
  .route("/")
  .get(checkItemQuery, validate, getAllItems)
  .post(
    protect,
    allowAccessTo("admin"),
    checkCreateItemBody,
    validate,
    createItem
  );

itemRouter
  .route("/:id")
  .get(checkItemId, validate, getItemById)
  .patch(
    protect,
    allowAccessTo("admin"),
    checkItemId,
    checkUpdateItemBody,
    validate,
    updateItem
  )
  .delete(protect, allowAccessTo("admin"), checkItemId, validate, deleteItem);

itemRouter
  .route("/:id/reviews")
  .get(checkItemId, checkReviewQuery, validate, getReviewsByItem);

itemRouter
  .route("/:id/orders")
  .get(checkItemId, checkOrderQuery, validate, getOrdersByItem);

module.exports = itemRouter;
