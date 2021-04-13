function datedAtValid(datedAt) {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return re.test(datedAt);
}

const datedAtValidate = (datedAt) => {
  if (datedAt === '' || datedAt === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
}
  if (!datedAtValid(datedAt)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
  return true;
};

module.exports = datedAtValidate;