const dateValidate = (date) => {
  if (!date) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  return true;
};

module.exports = dateValidate;