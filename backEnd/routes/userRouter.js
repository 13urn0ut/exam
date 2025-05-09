const userRouter = require("express").Router();
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
const validate = require("../validators/validate");

userRouter.route("/").get(protect, allowAccessTo("admin"), getAllUsers);
userRouter.route("/signup").post(checkSignupBody, validate, signupUser);
userRouter.route("/login").post(checkLoginBody, validate, loginUser);
userRouter.route("/logout").post(protect, logoutUser);
userRouter.route("/me").get(getMe);
userRouter
  .route("/:id")
  .get(protect, getUserById)
  .patch(protect, checkUpdateUserBody, validate, updateUser)
  .delete(protect, deleteUser);

module.exports = userRouter;
