function ageValid(age) {
  const minimumAge = 18;
  if (Number(age) >= minimumAge) return true;
}

const ageValidate = (age) => {
  if (age === '' || age === undefined) {
    throw new Error('O campo "age" é obrigatório');
}
  if (!ageValid(age)) {
    throw new Error('O crush deve ser maior de idade');
  }
  return true;
};

module.exports = ageValidate;