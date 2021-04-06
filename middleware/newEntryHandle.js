const dateKeyMessage = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

const nameHandle = (name, res) => {
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const ageHandle = (age, res) => {
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
};

const dateHadle = (date, res) => {
  if (!date) {
    return res.status(400)
    .json({ message: dateKeyMessage });
  }
};

const datedAtHadle = (datedAt, res) => {
  // Next line reference: https://www.the-art-of-web.com/javascript/validate-date/
  const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const validDate = regexDate.test(datedAt);

  if (!datedAt) {
    return res.status(400)
    .json({ message: dateKeyMessage });
  }
  if (!validDate) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const rateHandle = (rate, res) => {
  if (!rate && rate !== 0) {
    return res.status(400)
    .json({ message: dateKeyMessage });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const newEntryMiddleware = (req, res, next) => {
  const { name, age, date } = req.body;

  try {
    nameHandle(name, res);
    ageHandle(age, res);
    dateHadle(date, res);
    datedAtHadle(date.datedAt, res);
    rateHandle(date.rate, res);
  } catch (error) {
    return error;
  }

  return next();
};

module.exports = newEntryMiddleware;
