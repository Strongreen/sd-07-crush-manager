const { BAD_REQUEST } = require('../statusCode.json');

const validateDate = (request, response, next) => {
const { date } = request.body;
const regex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/](19|20)?\d\d$/g;

  if (!date
    || !Object.prototype.hasOwnProperty.call(date, 'datedAt')
    || !Object.prototype.hasOwnProperty.call(date, 'rate')
    ) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  
  if (!regex.test(date.datedAt)) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateDate;
