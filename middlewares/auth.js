const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    if (authorization.length !== 16) {
      res.status(401).send({
        message: 'Token inválido',
      });
    } else {
      next();
    }
  } else {
    res.status(401).send({
      message: 'Token não encontrado',
    });
  }
};

module.exports = authMiddleware;
