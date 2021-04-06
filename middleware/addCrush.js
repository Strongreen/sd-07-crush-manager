const checkName = (name) => {
  if (!name || name.length === 0) return { message: 'O campo "name" é obrigatório' };
  if (name.length < 3) return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  return null;
};

const checkAge = (age) => {
  if (!age || age.length === 0) return { message: 'O campo "age" é obrigatório' };
  if (age < 18) return { message: 'O crush deve ser maior de idade' };
  return null;
};

const checkObrigatorio = (datedAt, rate) => {
  if (!datedAt || !rate || datedAt.length === 0 || rate.length === 0) {
    return { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' };
  }
  return null;
};

const checkRate = (rate) => {
  if (rate < 1 || rate > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return null;
};

const checkDate = (date) => {
  if (!date) {
    return { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' };
  }
  const { datedAt, rate } = date;

  const checkObrigatorioRetorno = checkObrigatorio(datedAt, rate);
  if (checkObrigatorioRetorno) return checkObrigatorioRetorno;

  if (!datedAt.includes('/')) {
    return { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  const checkDateReturn = checkRate(rate);
  if (checkDateReturn) return checkDateReturn;
  return null;
};

module.exports = (req, res, next) => {
  const { name, age, date } = req.body;
  // check name
  const checkNameReturn = checkName(name);
  if (checkNameReturn) return res.status(400).send(checkNameReturn);

  const checkAgeReturn = checkAge(age);
  if (checkAgeReturn) return res.status(400).send(checkAgeReturn);

  const checkDateReturn = checkDate(date);
  if (checkDateReturn) return res.status(400).send(checkDateReturn);

  next();
};
