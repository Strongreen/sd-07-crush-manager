const { ERROR_UNAUTHORIZED } = require('../statusCode.json');

const validateToken = (request, response, next) => {
  const token = request.header('Authorization');

  if (!token) {
    return response
      .status(ERROR_UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return response
      .status(ERROR_UNAUTHORIZED)
      .json({ message: 'Token inválido' });
  }

  next();
};

module.exports = validateToken;
