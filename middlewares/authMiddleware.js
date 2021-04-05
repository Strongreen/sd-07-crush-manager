const status = require('../helpers/status');

const authMiddleware = (request, response, next) => {
  const { authorization } = request.headers;
  const validToken = /^(\d|\w){16}$/gm;
  if (!authorization) {
    return response.status(status.UNAUTHORIZED).json(
      {
        message: 'Token não encontrado',
      },
    );
  }
  if (!validToken.test(authorization)) {
    return response.status(status.UNAUTHORIZED).json(
      {
      message: 'Token inválido',
      },
    );
  }
  next();
};

module.exports = authMiddleware;
