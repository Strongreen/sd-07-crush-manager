const emailRequired = { message: 'O campo "email" é obrigatório' };
const emailInvalid = { message: 'O "email" deve ter o formato "email@email.com"' };

const passwordRequired = { message: 'O campo "password" é obrigatório' };
const passwordInvalid = { message: 'A "senha" deve ter pelo menos 6 caracteres' };

const tokenRiquired = 'Token não encontrado';
const tokenInvalid = 'Token inválido';

const nameRequired = { message: 'O campo "name" é obrigatório' };
const nameInvalid = { message: 'O "name" deve ter pelo menos 3 caracteres' };

const ageRequired = { message: 'O campo "age" é obrigatório' };
const ageInvalid = { message: 'O crush deve ser maior de idade' };

const dateAndRateRequired = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

const dateInvalid = { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };

const rateInvalid = { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };

module.exports = {
  emailRequired,
  emailInvalid,
  passwordRequired,
  passwordInvalid,
  tokenRiquired,
  tokenInvalid,
  nameRequired,
  nameInvalid,
  ageRequired,
  ageInvalid,
  dateAndRateRequired,
  dateInvalid,
  rateInvalid,
};