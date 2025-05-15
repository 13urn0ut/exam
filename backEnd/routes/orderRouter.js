const orderRouter = require("express").Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { protect, allowAccessTo } = require("../controllers/userController");
const {
  checkCreateOrderBody,
  checkUpdateOrderBody,
} = require("../validators/checkOrderBody");
const { checkOrderId } = require("../validators/checkOrderParams");
const { checkOrderQuery } = require("../validators/checkOrderQuery");
const validate = require("../validators/validate");

orderRouter
  .route("/")
  .get(protect, allowAccessTo("admin"), checkOrderQuery, validate, getAllOrders)
  .post(
    protect,
    allowAccessTo("user"),
    checkCreateOrderBody,
    validate,
    createOrder
  );

orderRouter
  .route("/me")
  .get(protect, checkOrderQuery, validate, getOrdersByUser);

orderRouter
  .route("/:id")
  .all(protect, checkOrderId)
  .get(validate, getOrderById)
  .patch(checkUpdateOrderBody, validate, updateOrder)
  .delete(validate, deleteOrder);

module.exports = orderRouter;
