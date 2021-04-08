const NAO_EXISTE = 400;

const validateDate = (date) => {
  // const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return regexDate.test(date);
};

const throwError = (error, message) => {
  if (error) {
    throw new Error(message);
  }
};

const analyseErrors = (name, age, date) => {
  const nameMinLength = 3;
  const ageMinLength = 18;
  throwError(!name, 'O campo "name" é obrigatório');
  throwError(name.length < nameMinLength,
    'O "name" deve ter pelo menos 3 caracteres');
  throwError(!age, 'O campo "age" é obrigatório');
  throwError(parseInt(age, 10) < ageMinLength,
    'O crush deve ser maior de idade');
  throwError(!date || date.rate === undefined || !date.datedAt,
    'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  const { datedAt, rate } = date;
  throwError(!validateDate(datedAt),
    'O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  throwError(parseInt(rate, 10) < 1 || parseInt(rate, 10) > 5,
    'O campo "rate" deve ser um inteiro de 1 à 5');
};

const Validate = (request, _response, next) => {
  try {
    throwError(!request.body, 'Deve conter um body obrigatório');
    const { body } = request;
    const { name, age, date } = body;
    analyseErrors(name, age, date);
    return next();
  } catch (error) {
    console.log(error);
    return next({
      status: NAO_EXISTE,
      message: error.message,
    });
  }
};

module.exports = Validate;
