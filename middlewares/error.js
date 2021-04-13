const errorMiddleware = (err, _req, res, _next) => {
  res.status(500).send({ error: err.message });
};

module.exports = errorMiddleware;
