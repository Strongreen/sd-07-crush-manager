const { ErrorHandler } = require('../helpers/error');

const validateName = (name) => {
  if (!name) {
    throw new ErrorHandler(400, 'O campo "name" é obrigatório');
  }
  if (name.length < 3) {
    throw new ErrorHandler(400, 'O "name" deve ter pelo menos 3 caracteres');
  }
};

const validatAge = (age) => {
  if (!age) {
    throw new ErrorHandler(400, 'O campo "age" é obrigatório');
  }
  if (parseInt(age, 10) < 18) {
    throw new ErrorHandler(400, 'O crush deve ser maior de idade');
  }
};

const validateDateAt = (datedAt) => {
  const regexDate = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20|)\d\d/;
  if (!regexDate.test(datedAt)) {
    throw new ErrorHandler(400, 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validateRate = (rate) => {
  const regexRate = /^[1-5]{1}$/;
  if (!regexRate.test(rate)) {
    throw new ErrorHandler(400, 'O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const validateDate = (date) => {
  console.log(date);
  if (!date) {
    console.log('(!date)', !date);
    throw new ErrorHandler(400,
       'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  
  if (!Object.prototype.hasOwnProperty.call(date, 'datedAt') 
  || !Object.prototype.hasOwnProperty.call(date, 'rate')) {
    console.log('!date.datedAt || !date.rate', !date.datedAt || !date.rate);
    throw new ErrorHandler(400, 
      'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  
  validateRate(date.rate);
  validateDateAt(date.datedAt);
};

const validateCrushMiddleware = (req, _res, next) => {
  const { name, age, date } = req.body;
  try {
    validateName(name);
    validatAge(age);
    validateDate(date);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateCrushMiddleware;
