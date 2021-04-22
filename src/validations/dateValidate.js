const datedAtValidate = (date) => {
  const { datedAt, rate } = date;
  const dateShape = new RegExp(/(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d/);
  const datedVerified = dateShape.test(datedAt);
  if (!datedVerified) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
  const rateToInt = +rate;
  if (rateToInt < 1 || rateToInt > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
  return false;
};

const dateValidate = (date) => {
  const message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  if (date === '' || date === undefined) {
    throw new Error(message);
  } 
  datedAtValidate(date);
  return false;
};

module.exports = dateValidate;
