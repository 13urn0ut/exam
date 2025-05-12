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
const {
  checkCreateOrderBody,
  checkUpdateOrderBody,
} = require("../validators/checkOrderBody");
const { checkOrderId } = require("../validators/checkOrderParams");
const validate = require("../validators/validate");

orderRouter
  .route("/")
  .get(protect, allowAccessTo("admin"), getAllOrders)
  .post(
    protect,
    allowAccessTo("user"),
    checkCreateOrderBody,
    validate,
    createOrder
  );

orderRouter.route("/me").get(protect, getAllOrdersByUser);

orderRouter
  .route("/:id")
  .all(protect, checkOrderId)
  .get(validate, getOrderById)
  .patch(checkUpdateOrderBody, validate, updateOrder)
  .delete(validate, deleteOrder);

module.exports = orderRouter;
