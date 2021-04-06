const errorMiddleware = (error, _request, response, _next) => {
  if (error.status) {
    response.status(error.status).send({
      error: error.message,
    });
  }
  response.status(500).send({
    error: error.message,
  });
};

module.exports = errorMiddleware;
