const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const validToken = /^(\d|\w){16}$/gm;
  if (!authorization) {
    return res.status(401).json(
      {
        message: 'Token não encontrado',
      },
    );
  }
  if (!validToken.test(authorization)) {
    return res.status(401).json(
      {
      message: 'Token inválido',
      },
    );
  }
  next();
};

module.exports = authMiddleware;