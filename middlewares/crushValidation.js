// Inspirado na solução do estudante Carlos Souza
// https://github.com/tryber/sd-07-crush-manager/pull/54/files#diff-413c2c256460d45e6947269f881e45d41c002b97bd35fd076647a0fed2b32c4e

const error = {
  nameMissing: 'O campo "name" é obrigatório',
  nameInvalid: 'O "name" deve ter pelo menos 3 caracteres',
  ageMissing: 'O campo "age" é obrigatório',
  ageInvalid: 'O crush deve ser maior de idade',
  dateMissing: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  datedInvalid: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
  rateInvalid: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
const checkDate = (date) => !date || !date.datedAt || (!date.rate && date.rate !== 0);

const crushValidation = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return res.status(400).send({ message: error.nameMissing });
  if (name.length < 3) return res.status(400).send({ message: error.nameInvalid });
  if (!age) return res.status(400).send({ message: error.ageMissing });
  if (age < 18) return res.status(400).send({ message: error.ageInvalid });
  next();
};

const dateValidation = (req, res, next) => {
  const { date } = req.body;
  const { datedAt, rate } = date;
  if (checkDate(date)) return res.status(400).send({ message: error.dateMissing });
  if (!dateRegex.test(datedAt)) return res.status(400).send({ message: error.datedInvalid });
  if (rate < 1 || rate > 5) return res.status(400).send({ message: error.rateInvalid });
  next();
};

module.exports = {
  crushValidation,
  dateValidation,
};
