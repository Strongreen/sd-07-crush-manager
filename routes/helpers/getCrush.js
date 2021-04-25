const nameValidator = (name) => {
  if (!name || name === '') {
    throw new Error('O campo "name" é obrigatório');
  }
  if (name < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};

const ageValidator = (age) => {
  if (!age || age === '') {
    throw new Error('O campo "age" é obrigatório');
  }
  if (age < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
};

const dateValidator = (date) => {
  const { datedAt, rate } = date;
  if (!date || !datedAt || !rate) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
};

const datedAtValidator = (date) => {
  const expectedPattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  
  const { datedAt } = date;
  if (!expectedPattern.test(datedAt)) {
    console.log(datedAt);
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa');
  }
  return date;
};

const rateValidator = (date) => {
  const { rate } = date;
  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

module.exports = {
  nameValidator,
  ageValidator,
  datedAtValidator,
  rateValidator,
  dateValidator,
};
