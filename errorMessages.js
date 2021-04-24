const notFound = {
  message: 'Crush não encontrado',
};

const emailIsMandatory = {
  message: 'O campo "email" é obrigatório',
};

const emailWrongFormat = {
  message: 'O "email" deve ter o formato "email@email.com"',
};

const passwordIsMandatory = {
  message: 'O campo "password" é obrigatório',
};

const passwordWrongFormat = {
  message: 'A "senha" deve ter pelo menos 6 caracteres',
};

const tokenDoesntFound = {
  message: 'Token não encontrado',
};

const tokenInvalid = {
  message: 'Token inválido',
};

const nameIsMandatory = {
  message: 'O campo "name" é obrigatório',
};

const nameWrongFormat = {
  message: 'O "name" deve ter pelo menos 3 caracteres',
};

const ageIsMandatory = {
  message: 'O campo "age" é obrigatório',
};

const ageInvalid = {
  message: 'O crush deve ser maior de idade',
};

const dateWrongFormat = {
  message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
};

const rateInvalid = {
  message: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const dateIsMandatory = {
  message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};

module.exports = {
  notFound,
  emailIsMandatory,
  emailWrongFormat,
  passwordIsMandatory,
  passwordWrongFormat,
  tokenDoesntFound,
  tokenInvalid,
  nameIsMandatory,
  nameWrongFormat,
  ageIsMandatory,
  ageInvalid,
  dateWrongFormat,
  rateInvalid,
  dateIsMandatory,
};
