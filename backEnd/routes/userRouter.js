const userRouter = require("express").Router();
const { getReviewsByUser } = require("../controllers/reviewController");
const {
  signupUser,
  loginUser,
  logoutUser,
  protect,
  allowAccessTo,
  getAllUsers,
  getUserById,
  updateUser,
  getMe,
  deleteUser,
} = require("../controllers/userController");
const {
  checkSignupBody,
  checkLoginBody,
  checkUpdateUserBody,
} = require("../validators/checkUserBody");
const { checkUserId } = require("../validators/checkUserParams");
const { checkReviewQuery } = require("../validators/checkReviewQuery");
const validate = require("../validators/validate");

userRouter.route("/").get(protect, allowAccessTo("admin"), getAllUsers);

userRouter.route("/signup").post(checkSignupBody, validate, signupUser);

userRouter.route("/login").post(checkLoginBody, validate, loginUser);

userRouter.route("/logout").post(protect, logoutUser);

userRouter.route("/me").get(getMe);

userRouter
  .route("/:id")
  .all(protect, checkUserId)
  .get(validate, getUserById)
  .patch(checkUpdateUserBody, validate, updateUser)
  .delete(validate, deleteUser);

userRouter
  .route("/:id/reviews")
  .get(checkUserId, checkReviewQuery, validate, getReviewsByUser);

module.exports = userRouter;
