const erroMiddleware = (err, req, res, _next) => {
  if (err.status) {
    res.status(err.status).send(err.status);
  }
};

module.exports = erroMiddleware;
