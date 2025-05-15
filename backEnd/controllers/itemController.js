const { Op } = require("sequelize");
const { Item, Category } = require("../models");
const AppError = require("../utils/appError");

exports.getAllItems = async (req, res, next) => {
  const {
    limit = 10,
    page = 1,
    orderBy = "createdAt",
    order = "DESC",
  } = req.query;

  const excludedFields = ["page", "limit", "orderBy", "order"];

  const queryObj = {};

  const querFields = Object.keys(req.query).filter(
    (field) => !excludedFields.includes(field)
  );

  querFields.forEach((field) => {
    if (field === "name") {
      queryObj.name = {
        [Op.iLike]: `%${req.query[field]}%`,
      };
    }

    if (field === "minDuration") {
      queryObj.duration = {
        ...queryObj.duration,
        [Op.gte]: req.query[field],
      };
    }

    if (field === "maxDuration") {
      queryObj.duration = {
        ...queryObj.duration,
        [Op.lte]: req.query[field],
      };
    }

    if (field === "minPrice") {
      queryObj.price = {
        ...queryObj.price,
        [Op.gte]: req.query[field],
      };
    }

    if (field === "maxPrice") {
      queryObj.price = {
        ...queryObj.price,
        [Op.lte]: req.query[field],
      };
    }

    if (field === "minRating") {
      queryObj.rating = {
        ...queryObj.rating,
        [Op.gte]: req.query[field],
      };
    }

    if (field === "maxRating") {
      queryObj.rating = {
        ...queryObj.rating,
        [Op.lte]: req.query[field],
      };
    }

    if (field === "categoryId") {
      queryObj.categoryId = req.query[field];
    }
  });

  try {
    const items = await Item.findAll({
      where: queryObj,
      limit,
      offset: (page - 1) * limit,
      order: [[orderBy, order]],
      include: [{ model: Category }],
    });
    const itemCount = await Item.count({ where: queryObj });

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
