const bookmarkRouter = require("express").Router();
const {
  getAllBookmarks,
  // getBookmarksByItem,
  getBookmarksByUser,
  createBookmark,
  deleteBookmark,
  updateBookmark,
  getBookmarkById,
} = require("../controllers/bookmarkController");
const { protect, allowAccessTo } = require("../controllers/userController");
const {
  checkCreateBookmarkBody,
  checkUpdateBookmarkBody,
} = require("../validators/checkBookmarkBody");
const { checkBookmarkId } = require("../validators/checkBookmarkParams");
const { checkBookmarkQuery } = require("../validators/checkBookmarkQuery");
const validate = require("../validators/validate");

bookmarkRouter
  .route("/")
  .get(
    protect,
    allowAccessTo("admin"),
    checkBookmarkQuery,
    validate,
    getAllBookmarks
  )
  .post(
    protect,
    allowAccessTo("user"),
    checkCreateBookmarkBody,
    validate,
    createBookmark
  );

bookmarkRouter
  .route("/me")
  .get(protect, checkBookmarkQuery, validate, getBookmarksByUser);

bookmarkRouter
  .route("/:id")
  .all(protect, checkBookmarkId)
  .get(validate, getBookmarkById)
  .patch(checkUpdateBookmarkBody, validate, updateBookmark)
  .delete(validate, deleteBookmark);

module.exports = bookmarkRouter;
