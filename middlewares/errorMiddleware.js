const errorMiddleware = (e, _req, res, _next) => {
  console.log(e.stack);
  return res.status(500).send({
    message: 'Algo deu errado!',
});
};

module.exports = errorMiddleware;