const ApiMessages = {
  TOKEN_NOT_FOUND: 'Token não encontrado',
  UNAUTHORIZED_TOKEN: 'Token inválido',

  CRUSH_NOT_FOUND: 'Crush não encontrado',

  EMAIL_MISSING: 'O campo "email" é obrigatório',
  EMAIL_WRONG_FORMAT: 'O "email" deve ter o formato "email@email.com"',

  PASSWORD_MISSING: 'O campo "password" é obrigatório',
  PASSWORD_WRONG_FORMAT: "A \"senha\" deve ter pelo menos 6 caracteres",
  
  NAME_MISSING: 'O campo "name" é obrigatório',
  NAME_WRONG_FORMAT: 'O "name" deve ter pelo menos 3 caracteres',

  AGE_MISSING: 'O campo "age" é obrigatório',
  UNDER_AGED: 'O crush deve ser maior de idade',

  DATE_MISSING: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',

  WRONG_RATE: 'O campo "rate" deve ser um inteiro de 1 à 5',

  DATED_AT_WRONG_FORMAT: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',

  CRUSH_DELETED: 'Crush deletado com sucesso',

};

module.exports = ApiMessages;
