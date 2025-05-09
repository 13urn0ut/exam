const itemRouter = require("express").Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { protect, allowAccessTo } = require("../controllers/userController");

itemRouter.route("/").get(getAllItems);
itemRouter.route("/").post(protect, allowAccessTo("admin"), createItem);
itemRouter
  .route("/:id")
  .get(getItemById)
  .patch(protect, allowAccessTo("admin"), updateItem)
  .delete(protect, allowAccessTo("admin"), deleteItem);

module.exports = itemRouter;
