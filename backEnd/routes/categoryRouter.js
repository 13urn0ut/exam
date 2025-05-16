const categoryRouter = require("express").Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, allowAccessTo } = require("../controllers/userController");
const {
  checkCreateCategoryBody,
  checkUpdateCategoryBody,
} = require("../validators/checkCategoryBody");
const { checkCategoryId } = require("../validators/checkCategoryParams");
const validate = require("../validators/validate");

categoryRouter
  .route("/")
  .get(getAllCategories)
  .post(
    protect,
    allowAccessTo("admin"),
    checkCreateCategoryBody,
    validate,
    createCategory
  );

categoryRouter
  .route("/:id")
  .all(protect, allowAccessTo("admin"), checkCategoryId)
  .patch(checkUpdateCategoryBody, validate, updateCategory)
  .delete(validate, deleteCategory);
