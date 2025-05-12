const { Item, Category } = require("../models");
const AppError = require("../utils/appError");

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      include: [{ model: Category }],
    });
    const itemCount = await Item.count();

    res
      .status(200)
      .json({ status: "success", results: itemCount, data: items });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id, {
      include: [{ model: Category }],
    });
    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json({ status: "success", data: newItem });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.update(req.body);

    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy();

    res.status(200).json({ status: "success", data: item });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
