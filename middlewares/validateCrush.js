function validateName(name) {
  if (
    name === ''
    || !name
  ) throw new Error('O campo "name" é obrigatório');

  else if (name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');

  return true;
}

function validateAge(age) {
  if (
    age === ''
    || !age
  ) throw new Error('O campo "age" é obrigatório');

  else if (Number(age) < 18) throw new Error('O crush deve ser maior de idade');

  return true;
}

function validateRate(rate) {
  if (!(Number(rate) >= 1
    && Number(rate) <= 5
    && Number(rate) / Number.isInteger(rate))) {
      throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
    }

  return true;
}
function validateDate(datedAt) {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  const isValid = dateRegex.test(datedAt);

  if (!isValid) throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');

  return true;
}

function isRateValid(rate) {
  return rate === '' || rate == null || rate === undefined;
}

function isDateEmpty(date) {
  if (
    !date
    || date.datedAt === ''
    || !date.datedAt
    || isRateValid(date.rate)
  ) throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
}

function validateCrush(request, _response, next) {
  const { name, age, date } = request.body;

  isDateEmpty(date);

  if (
    validateName(name)
      && validateAge(age)
      && validateRate(date.rate)
      && validateDate(date.datedAt)
  ) {
    next();
  }
}

module.exports = validateCrush;
