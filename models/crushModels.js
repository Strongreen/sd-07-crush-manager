const validEmail = (email) => {
  const reGex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === undefined) {
    return {
      error: true,
      message: 'O campo "email" é obrigatório',
    };
  }

  if (!reGex.test(email)) {
    return {
      error: true,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return { error: false };
};

const validPass = (password) => {
  if (password === undefined) {
    return {
      error: true,
      message: 'O campo "password" é obrigatório',
    };
  }
  if (String(password).length < 6) {
    return {
      error: true,
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    };
  }
  return { error: false };
};

const validToken = (authorization) => {
  if (!authorization) {
    return {
      message: 'Token não encontrado',
    };
  }
  if (authorization.length < 16) {
    return {
      message: 'Token inválido',
    };
  }
  return true;
};

const validName = (name) => {
  if (name === undefined) {
    throw new Error('O campo "name" é obrigatório');
  }
  if (String(name).length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};

const validAge = (age) => {
  if (age === undefined) {
    throw new Error('O campo "age" é obrigatório');
  }
  if (Number(age) < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
};

const validDate = (datedAt) => {
  const reGex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!reGex.test(datedAt)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validaDatedAtIsValid = (element) => {
  if (!element.date.datedAt || element.date.datedAt === undefined) {
    return true;
  }
};

const validaDate = (element) => {
  if (element.date === undefined
    || validaDatedAtIsValid(element)
    || element.date.rate === ''
    || element.date.rate === undefined
  ) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
};

const validRate = (rate) => {
  if (Number(rate) < 1 || Number(rate) > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const validForAll = (element) => {
  validaDate(element);
  validName(element.name);
  validAge(element.age);
  validDate(element.date.datedAt);
  validRate(element.date.rate);
};

module.exports = {
  validEmail,
  validPass,
  validToken,
  validName,
  validAge,
  validDate,
  validaDatedAtIsValid,
  validRate,
  validForAll,
};
