const { Category } = require("../models");
const AppError = require("../utils/appError");

exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json({ status: "success", data: newCategory });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    await category.update(req.body);

    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    await category.destroy();

    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
