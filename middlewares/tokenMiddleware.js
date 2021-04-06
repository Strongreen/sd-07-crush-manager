const tokenMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  switch (true) {
    case !authorization:
      return res.status(401).json({
        message: 'Token não encontrado',
      });
    case authorization.length !== 16:
      return res.status(401).json({
        message: 'Token inválido',
      });
    default:
       break;
  }
  next();
};

  module.exports = tokenMiddleware;