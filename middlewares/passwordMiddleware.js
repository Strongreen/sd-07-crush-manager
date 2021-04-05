const status = require('../helpers/status');

const passwordMiddleware = (request, response, next) => {
  const { password } = request.body;

  if (!password) {
    return response.status(status.BAD_REQUEST).json(
      { message: 'O campo "password" é obrigatório' },
    );
  }
  if (password.length < 6) {
    return response.status(status.BAD_REQUEST).json(
      { message: 'A "senha" deve ter pelo menos 6 caracteres' },
    );
  }
  next();
};

module.exports = passwordMiddleware;
