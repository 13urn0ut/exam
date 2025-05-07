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

userRouter.route("/").get(getAllUsers);
userRouter.route("/signup").post(signupUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(protect, logoutUser);
userRouter.route("/me").get(getMe);
userRouter
  .route("/:id")
  .get(getUserById)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = userRouter;
