function rateValid(rate) {
  const minimumRate = 1;
  const maximumRate = 5;
  if (Number(rate) >= minimumRate
    && Number(rate) <= maximumRate) return true;
}

const rateValidate = (rate) => {
  if (rate === '' || rate === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
}
  if (!rateValid(rate)) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
  return true;
};

module.exports = rateValidate;