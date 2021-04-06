const BAD_REQUEST = 400;

const validateDateAt = (req, res, next) => {
  const { date } = req.body;
  if (!date || date.rate === undefined) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  const { rate } = date;

  if (rate < 1 || rate > 5) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = validateDateAt;