const { Order } = require("../models");
const AppError = require("../utils/appError");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { itemId } = req.body;

    const newOrder = await Order.create({ userId, itemId });

    res.status(201).json({ status: "success", data: newOrder });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.update(req.body);

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
