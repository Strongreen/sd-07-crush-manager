const validateName = (name) => {
  if (!name) {
    throw new Error('O campo "name" é obrigatório');
  }

  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};

const validateAge = (age) => {
  if (!age) {
    throw new Error('O campo "age" é obrigatório');
  }
  if (age < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
};

const validateDate = (date) => {
  const regexDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const verifyDate = regexDate.test(date);

  if (!verifyDate) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validateRate = (rate) => {
  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const verifyDateObject = (date) => {
  if (!date || date.datedAt === undefined || date.rate === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
};

const dataCrushMiddleware = (req, res, next) => {
  const { name, age, date } = req.body;

  try {
    validateName(name);
    validateAge(age);
    verifyDateObject(date);
    validateDate(date.datedAt);
    validateRate(date.rate);
    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = dataCrushMiddleware;
