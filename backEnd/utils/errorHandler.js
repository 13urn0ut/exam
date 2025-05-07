const errorHandler = (err, req, res, next) => {
  if (err) {
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message, stack: err.stack });
  }
};

module.exports = errorHandler;
