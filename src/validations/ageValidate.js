const ageValidate = (age) => {
  if (age === '' || age === undefined) return { message: 'O campo "age" é obrigatório' };
  const ageToInt = parseInt(age, 10);
  if (ageToInt < 18) return { message: 'O crush deve ser maior de idade' };
  return false;
};

module.exports = ageValidate;
