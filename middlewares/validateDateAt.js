const BAD_REQUEST = 400;

const validateDateAt = (req, res, next) => {
  const { date } = req.body;
  if (!date || !date.datedAt) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  const { datedAt } = date;

  // Regex sugerido pelo Thadeu
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!(dateRegex.test(datedAt))) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = validateDateAt;