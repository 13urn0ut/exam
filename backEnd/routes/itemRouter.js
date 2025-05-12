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
const { checkItemParams } = require("../validators/checkItemParams");
const validate = require("../validators/validate");

itemRouter.route("/").get(getAllItems);
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
  .get(checkItemParams, validate, getItemById)
  .patch(
    protect,
    allowAccessTo("admin"),
    checkItemParams,
    checkUpdateItemBody,
    validate,
    updateItem
  )
  .delete(
    protect,
    allowAccessTo("admin"),
    checkItemParams,
    validate,
    deleteItem
  );

module.exports = itemRouter;
