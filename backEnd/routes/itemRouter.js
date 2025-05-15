const itemRouter = require("express").Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { protect, allowAccessTo } = require("../controllers/userController");
const {
  checkCreateItemBody,
  checkUpdateItemBody,
} = require("../validators/checkItemBody");
const { checkItemId } = require("../validators/checkItemParams");
const { checkItemQuery } = require("../validators/checkItemQuery");
const validate = require("../validators/validate");

itemRouter.route("/").get(checkItemQuery, validate, getAllItems);
itemRouter
  .route("/")
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

module.exports = itemRouter;
