const { BAD_REQUEST } = require('../statusCode.json');

const validateCrush = (request, response, next) => {
const { age } = request.body;

  if (!age) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O crush deve ser maior de idade' });
  }

  next();
};

module.exports = validateCrush;
