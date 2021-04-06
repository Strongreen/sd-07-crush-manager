const ERRO = 400;
const arayRate = [1, 2, 3, 4, 5];
const dateFormat = /\d{2}[/]\d{2}[/]\d{4}/;

const isInvalidDate = (date) => !date || !date.datedAt || (!date.rate && date.rate !== 0);

module.exports = {
  validateToken: (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) {
      response.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length < 16) {
      response.status(401).json({ message: 'Token inválido' });
    }
    next();
  },
  validateNameAge: (request, response, next) => {
    const { name, age } = request.body;
    if (!name) {
      response.status(ERRO).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      response.status(ERRO).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    if (!age) {
      response.status(ERRO).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      response.status(ERRO).json({ message: 'O crush deve ser maior de idade' });
    }
    next();
  },
  validateDate: (request, response, next) => {
    const { date } = request.body;
    if (isInvalidDate(date)) {
      response.status(ERRO).json({
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
    }
    const { datedAt, rate } = date;
    if (!dateFormat.test(datedAt)) {
      response.status(ERRO).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!arayRate.includes(rate)) {
      response.status(ERRO).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  },
};