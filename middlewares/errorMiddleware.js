const { handleError } = require('../helpers/error');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.statusCode) {
    handleError(err, res);
  } else {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = errorMiddleware;
