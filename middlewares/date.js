const RESP = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

const verifyEmpty = (date) => {
  if (!date) {
    return RESP;
  }
  const { datedAt, rate } = date;
  if (!rate || !datedAt || datedAt.length === 0) {
    return RESP;
  }
  return 'valido';
};

const verifyRange = (date) => {
  if (!date) {
    return RESP;
  }
  const { rate } = date;
  if (rate < 1 || rate > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return 'valido';
};

const verifyRegex = (date) => {
  const regexDate = new RegExp('[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}');
  if (!date) {
    return RESP;
  }
  const { datedAt } = date;
  if (!regexDate.test(datedAt)) {
    return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  }
  return 'valido';
};

const dateMiddleware = (req, res, next) => {
  const { date } = req.body;
  const responseDate = verifyEmpty(date);
  const responseRate = verifyRange(date);
  const responseRegex = verifyRegex(date);
  if (responseDate !== 'valido') {
    res.status(400).send({ message: responseDate });
  } else if (responseRegex !== 'valido') {
    res.status(400).send({ message: responseRegex });
  } else if (responseRate !== 'valido') {
    res.status(400).send({ message: responseRate });
  } else {
    next();
  }
};

module.exports = dateMiddleware;
