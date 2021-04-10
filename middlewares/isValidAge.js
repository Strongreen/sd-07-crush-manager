const ageIs = {
  empy: 'O campo "age" é obrigatório',
  invalid: 'O crush deve ser maior de idade',
};

const FAIL = 400;

function isValidAge(request, response, next) {
  const { age } = request.body || '';
  const isEmpy = !age;
  const invalid = Number.isInteger(age) && +age < 18;

  if (isEmpy) {
    response.status(FAIL).send({ message: ageIs.empy });
  } else if (invalid) {
    response.status(FAIL).send({ message: ageIs.invalid });
  } else {
    next();
  }
}

module.exports = isValidAge;
