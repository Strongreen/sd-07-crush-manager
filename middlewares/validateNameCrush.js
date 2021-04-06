const { BAD_REQUEST } = require('../statusCode.json');

const validateCrush = (request, response, next) => {
const { name } = request.body;

  if (!name) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

module.exports = validateCrush;
