const isDateValid = require('../functions/isDateValid');

const dateValidation = (req, res, next) => {
  const { date } = req.body;

  if (!date || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (!isDateValid(date.datedAt)) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = dateValidation;