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
  .get(getItemById)
  .patch(
    protect,
    allowAccessTo("admin"),
    checkUpdateItemBody,
    validate,
    updateItem
  )
  .delete(protect, allowAccessTo("admin"), deleteItem);

module.exports = itemRouter;
