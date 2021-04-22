const datedAtValidate = ({ datedAt, rate }) => {
  const dateShape = new RegExp(/(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d/);
  const datedVerified = dateShape.test(datedAt);
  if (!datedVerified) return { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };

  const rateToInt = +rate;
  if (rateToInt < 1 || rateToInt > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return false;
};

const dateValidate = (date) => {
  const message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  if (date === '' || date === undefined) return { message };
  const dateInfoValidate = datedAtValidate(date);
  if (!dateInfoValidate) return dateInfoValidate.message;
  return false;
};

module.exports = dateValidate;
