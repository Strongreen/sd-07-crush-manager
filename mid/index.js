const tokenvalid = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    response.status(401).json({ message: 'Token não encontrado' });
  } else if (authorization.length < 16) {
    response.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const crushvalid = (request, response, next) => {
  const { name, age } = request.body;

  if (!name) {
    response.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    response.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};
const verificação = (date) => !date || !date.datedAt || (!date.rate && date.rate !== 0);

const datavalid = (request, response, next) => {
  const { date } = request.body;
  const { datedAt, rate } = date;
  const regexDATA = /\d{2}[/]\d{2}[/]\d{4}/;
  const pontos = [0, 1, 2, 3, 4, 5];

  if (verificação(date)) {
    response.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (!regexDATA.test(datedAt)) {
    response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!pontos.includes(rate)) {
    response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  tokenvalid,
  crushvalid,
  datavalid,
};