const { BAD_REQUEST } = require('../statusCode.json');

const validateDate = (request, response, next) => {
  const { date: { rate } } = request.body;

  if (rate < 1 || rate > 5) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateDate;
