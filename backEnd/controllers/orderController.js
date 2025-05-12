const { Order } = require("../models");
const { Item } = require("../models");
const AppError = require("../utils/appError");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({ include: [{ model: Item }] });
    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getAllOrdersByUser = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: Item }],
    });

    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: Item }],
    });

    res.status(200).json({ status: "success", data: order });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { itemId } = req.body;

    console.log(Order);

    const newOrder = await Order.create({ userId, itemId });

    res.status(201).json({ status: "success", data: newOrder });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { itemId } = req.body;
    const order = await Order.findByPk(req.params.id);
    await order.update({ userId, itemId });

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
