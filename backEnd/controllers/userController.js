const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const AppError = require("../utils/appError");

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendCookie = (user, res) => {
  const token = signJWT(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
};

exports.signupUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hash = await argon2.hash(password);
    const newUser = await User.create({ email, password: hash });

    sendCookie(newUser, res);

    newUser.password = undefined;

    res.status(201).json({ status: "success", data: newUser });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    sendCookie(user, res);

    user.password = undefined;

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ status: "success", message: "Logged out" });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      throw new AppError("You are not logged in", 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new AppError(
        "The user belonging to this token no longer exist",
        401
      );
    }

    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    next(new AppError(error.message, 401));
  }
};

exports.allowAccessTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      throw new AppError(
        "You do not have permission to perform this action",
        403
      );
    }
    next();
  };
};

exports.getAllUsers = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "DESC",
  } = req.query;

  try {
    const users = await User.findAll({
      page,
      limit,
      order: [[orderBy, order]],
    });
    const userCount = await User.count();

    users.forEach((user) => {
      user.password = undefined;
    });

    res
      .status(200)
      .json({ status: "success", results: userCount, data: users });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded?.id);

    if (!user) {
      return res.status(200).json({ status: "success", data: null });
    }

    user.password = undefined;

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    user.password = undefined;
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    await user.update({
      email: req.body.email || user.email,
      password: req.body.newPassword
        ? await argon2.hash(req.body.newPassword)
        : user.password,
    });

    user.password = undefined;
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    user.password = undefined;
    await user.destroy();
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
