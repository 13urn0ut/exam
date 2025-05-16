const { Bookmark, User, Item } = require("../models");
const AppError = require("../utils/appError");

exports.getAllBookmarks = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "DESC",
  } = req.query;

  try {
    const bookmarks = await Bookmark.findAll({
      include: [{ model: Item }],
      page,
      limit,
      order: [[orderBy, order]],
    });

    res.status(200).json({ status: "success", data: bookmarks });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getBookmarksByUser = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "DESC",
  } = req.query;

  try {
    const { id: userId } = req.user;
    const bookmarks = await Bookmark.findAll({
      where: { userId },
      include: [{ model: Item }],
      page,
      limit,
      order: [[orderBy, order]],
    });

    res.status(200).json({ status: "success", data: bookmarks });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getBookmarksByItem = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "DESC",
  } = req.query;

  try {
    const { id: itemId } = req.params;
    const bookmarks = await Bookmark.findAll({
      where: { itemId },
      include: [{ model: User, attributes: ["id", "email"] }],
      page,
      limit,
      order: [[orderBy, order]],
    });

    res.status(200).json({ status: "success", data: bookmarks });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getBookmarkById = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByPk(req.params.id, {
      include: [{ model: Item }],
    });

    res.status(200).json({ status: "success", data: bookmark });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.createBookmark = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { itemId } = req.body;

    const newBookmark = await Bookmark.create({ userId, itemId });

    res.status(201).json({ status: "success", data: newBookmark });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateBookmark = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { itemId } = req.body;

    const bookmark = await Bookmark.findByPk(req.params.id);

    await bookmark.update({ userId, itemId });

    res.status(200).json({ status: "success", data: Bookmark });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.deleteBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findByPk(req.params.id);

    await bookmark.destroy();

    res.status(200).json({ status: "success", data: bookmark });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
