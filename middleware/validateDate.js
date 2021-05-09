const msg = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
const dateTest = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/20[0-9]{2}/;

const testUndefined = (date) => {
  if (typeof date === 'undefined'
    || typeof date.datedAt === 'undefined'
    || typeof date.rate === 'undefined') return 1;
  return 0;
};

const checkRate = (rate) => {
  if (!Number.isInteger(rate)) return 1;
  if (rate < 1) return 1;
  if (rate > 5) return 1;
  return 0;
};

const validateDate = (request, response, next) => {
  const { date } = request.body;
  if (testUndefined(date)) response.status(400).send({ message: msg });
  if (!dateTest.test(date.datedAt)) {
    return response
      .status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (checkRate(date.rate)) {
    return response
      .status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = validateDate;
