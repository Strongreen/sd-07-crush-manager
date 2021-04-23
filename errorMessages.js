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
  message: 'O "password" deve ter pelo menos 6 caracteres',
};

module.exports = {
  notFound,
  emailIsMandatory,
  emailWrongFormat,
  passwordIsMandatory,
  passwordWrongFormat,
};
