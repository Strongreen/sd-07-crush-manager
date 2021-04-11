const {
  isValidEmail,
  isValidPassword,
  isValidToken } = require('./services/loginService');

const { isValidName,
  isValidDate,
  isOverEighteen,
  isRateInRange } = require('./services/crushService');

exports.validateEmailMiddleware = (req, res, next) => {
    const emailErrorCode400 = { message: 'O campo "email" é obrigatório' };
    const invalidEmailErrorCode400 = { message: 'O "email" deve ter o formato "email@email.com"' };
    const { email } = req.body;
    if (!email || email === '') return res.status(400).send(emailErrorCode400);
    if (!isValidEmail(email)) return res.status(400).send(invalidEmailErrorCode400);
    next();
};

exports.validatePasswordMiddleware = (req, res, next) => {
    const passwordNotFoundError = { message: 'O campo "password" é obrigatório' };
    const invalidPasswordError = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
    const { password } = req.body;
    if (!password || password === '') return res.status(400).send(passwordNotFoundError);
    if (!isValidPassword(password)) return res.status(400).send(invalidPasswordError);
    next();
};

exports.validateAuthorizationMiddleware = (req, res, next) => {
  const authNotFoundError = { message: 'Token não encontrado' };
  const invalidAuthError = { message: 'Token inválido' };
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send(authNotFoundError);
  if (!isValidToken(authorization)) return res.status(401).send(invalidAuthError);
  next();
};

exports.validateNameMiddleware = (req, res, next) => {
  const nameNotFound = { message: 'O campo "name" é obrigatório' };
  const invalidNameError = { message: 'O "name" deve ter pelo menos 3 caracteres' };
  const { name } = req.body;
  if (!name || name === '') return res.status(400).send(nameNotFound);
  if (!isValidName(name)) return res.status(400).send(invalidNameError);
  next();
};

exports.validateAgeMiddleware = (req, res, next) => {
  const ageNotFound = { message: 'O campo "age" é obrigatório' };
  const underAgeError = { message: 'O crush deve ser maior de idade' };
  const { age } = req.body;
  if (age === undefined || age === '') return res.status(400).send(ageNotFound);
  if (!isOverEighteen(age)) return res.status(400).send(underAgeError);
  next();
};

exports.validateDateMiddleware = (req, res, next) => {
  const dateNotFoundOrSomeIsEmpty = { 
    message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  };
  const invalidDateFormatError = { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };
  const { date } = req.body;
  if (date === undefined || date.datedAt === undefined || date.datedAt === '') {
    return res.status(400).send(dateNotFoundOrSomeIsEmpty);
  }
  if (!isValidDate(date.datedAt)) return res.status(400).send(invalidDateFormatError);
  next();
};

exports.validateRateMiddleware = (req, res, next) => {
  const dateNotFoundOrSomeIsEmpty = { 
    message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  };
  const invalidRateRangeError = { 
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  };
  const { date } = req.body;

  if (date.rate === undefined || String(date.rate) === '') {
    return res.status(400).send(dateNotFoundOrSomeIsEmpty);
  }
  if (!isRateInRange(date.rate)) return res.status(400).send(invalidRateRangeError);
  next();
};

exports.errorMiddleware = (err, _req, res, _next) => 
     res.send({ message: err.message });
