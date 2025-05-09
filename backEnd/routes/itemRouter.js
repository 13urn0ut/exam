const itemRouter = require("express").Router();
const {
  getAllItems,
  // getItemById,
  createItem,
  // updateItem,
  // deleteItem,
} = require("../controllers/itemController");

itemRouter.route("/").get(getAllItems);
itemRouter.route("/").post(createItem);
// itemRouter.route("/:id").get(getItemById).patch(updateItem).delete(deleteItem);

module.exports = itemRouter;
