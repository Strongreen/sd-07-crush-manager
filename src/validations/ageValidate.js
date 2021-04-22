const ageValidate = (age) => {
  if (age === '' || age === undefined) throw new Error('O campo "age" é obrigatório');
  if (+age < 18) throw new Error('O crush deve ser maior de idade');
  return false;
};

module.exports = ageValidate;
