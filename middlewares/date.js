const verifyEmpty = (date) => {
  const { datedAt, rate } = date;
  if (!date || datedAt.length === 0 || rate.length === 0) {
    return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }
  return 'valido';
};

const verifyRange = (number) => {
  if (number < 1 || number > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return 'valido';
};

const dateMiddleware = (req, res, next) => {
  const { date } = req.body;
  const { datedAt, rate } = date;
  const regexDate = new RegExp('[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}');
  const responseRate = verifyRange(rate);
  const responseDate = verifyEmpty(date);
  if (responseDate !== 'valido') {
    res.status(400).send({
      message: responseDate,
    });
  } else if (!regexDate.test(datedAt)) {
    res
      .status(400)
      .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } else if (responseRate !== 'valido') {
    res.status(400).send({ message: responseRate });
  } else {
    next();
  }
};

module.exports = dateMiddleware;
