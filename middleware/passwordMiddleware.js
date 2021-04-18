const { status } = require('../helpers');

const passwordMiddleware = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(status.BAD_REQUEST).json(
      { message: 'O campo "password" é obrigatório' },
    );
  }
  if (password.length < 6) {
    return res.status(status.BAD_REQUEST).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
    );
  }
  next();
};

module.exports = passwordMiddleware;