const { ErrorHandler } = require('../helpers/error');

const validateTokenMiddleware = (req, _res, next) => {
  const TOKEN_LENGTH = 16;
  const token = req.header('Authorization');
  try {
    if (!token) {
      throw new ErrorHandler(401, 'Token não encontrado');
    }
    if (token.length !== TOKEN_LENGTH) {
      throw new ErrorHandler(401, 'Token inválido');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateTokenMiddleware;
