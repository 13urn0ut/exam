const orderRouter = require("express").Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByUser,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { protect, allowAccessTo } = require("../controllers/userController");
const validate = require("../validators/validate");

orderRouter
  .route("/")
  .get(protect, allowAccessTo("admin"), getAllOrders)
  .post(protect, allowAccessTo("user"), validate, createOrder);

orderRouter.route("/me").get(protect, getAllOrdersByUser);

orderRouter
  .route("/:id")
  .all(protect)
  .get(getOrderById)
  .patch(validate, updateOrder)
  .delete(deleteOrder);

module.exports = orderRouter;
