const validateDatedAt = (datedAt) => {
  const regexDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  return regexDate.test(datedAt);
};
const verifyDate = (date) => date && date.datedAt && date.rate !== undefined;
const validateRate = (rate) => rate === 1 || rate === 2 || rate === 3 || rate === 4 || rate === 5;

const errNoDate = {
  message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};
const errInvalidDatedAt = { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };
const errInvalidRate = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

module.exports = (req, res, next) => {
  const { date } = req.body;
  if (!verifyDate(date)) return res.status(400).send(errNoDate);
  if (!validateDatedAt(date.datedAt)) return res.status(400).send(errInvalidDatedAt);
  if (!validateRate(date.rate)) return res.status(400).send(errInvalidRate);
  next();
};
