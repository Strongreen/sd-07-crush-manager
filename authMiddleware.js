const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

module.exports = authMiddleware;
