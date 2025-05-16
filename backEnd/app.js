const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./utils/errorHandler");
const userRouter = require("./routes/userRouter");
const itemRouter = require("./routes/itemRouter");
const bookmarkRouter = require("./routes/bookmarkRouter");
const reviewRouter = require("./routes/reviewRouter");
const categoryRouter = require("./routes/categoryRouter");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("/*name", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);
app.use(errorHandler);

module.exports = app;
