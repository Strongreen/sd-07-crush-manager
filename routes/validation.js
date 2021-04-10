const message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

const validateName = (name) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
};

const validateDate = (date) => {
  const dateFormate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (date === undefined) {
    return message;
  }
  if (!date.match(dateFormate)) {
    return 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  }
};

const validateAge = (age) => {
  let result;

  if (age === undefined) {
    result = 'O campo "age" é obrigatório';
  }
  if (age < 18) {
    result = 'O crush deve ser maior de idade';
  }
  return result;
};

const validateRate = (rate) => {
  if (rate === undefined) {
    return message;
  }
  if (rate > 5 || rate < 1) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
};

const validationToken = (authorizarion) => {
  console.log(authorizarion);
  let result;
  if (!authorizarion) {
    result = 'Token não encontrado';
  } else if (authorizarion.length < 16) {
    result = 'Token inválido';
  }
  return result;
};

const validateDataObject = (date) => {
  let result;
  if (!date) {
    result = message;
  } else {
    result = validateDate(date.datedAt) || validateRate(date.rate);
  }
  return result;
};

const validateFilds = (filds) => {
  const { authorization, name, age, date } = filds;
  // valida data
  const toDate = validateDataObject(date);
  if (toDate) return { status: 400, message: toDate };

  // Valida o token
  const allowed = validationToken(authorization);
  if (allowed) return { status: 401, message: allowed };

  // Valida o nome
  const toName = validateName(name);
  if (toName) return { status: 400, message: toName };

  // Valida idade
  const toAge = validateAge(age);
  if (toAge) return { status: 400, message: toAge };

  return undefined;
};

module.exports = {
  validateFilds,
};
