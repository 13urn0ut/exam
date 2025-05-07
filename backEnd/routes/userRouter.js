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
const { checkSignupBody } = require("../validators/checkUserBody");
const validate = require("../validators/validate");

userRouter.route("/").get(getAllUsers);
userRouter.route("/signup").post(checkSignupBody, validate, signupUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(protect, logoutUser);
userRouter.route("/me").get(getMe);
userRouter
  .route("/:id")
  .get(getUserById)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = userRouter;
