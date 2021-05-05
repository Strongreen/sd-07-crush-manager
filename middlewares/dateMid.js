const checkEmpty = (date) => {
  if (date === undefined) {
    throw new Error(
      'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    );
  }
  const { datedAt, rate } = date;
  if (rate === undefined || datedAt === undefined || datedAt.length === 0) {
    throw new Error(
      'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    );
  }
};

const checkRange = (date) => {
  const { rate } = date;
  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const checkRegex = (date) => {
  const dataRegex = new RegExp('[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}');
  const { datedAt } = date;
  if (!dataRegex.test(datedAt)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const dateMid = (req, res, next) => {
  const { date } = req.body;
  try {
    checkEmpty(date);
    checkRange(date);
    checkRegex(date);
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = dateMid;
