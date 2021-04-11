const err = (error, _req, res, _next) => {
  const { status, resp } = error;
  res.status(status).send({ message: resp });
};

module.exports = err;