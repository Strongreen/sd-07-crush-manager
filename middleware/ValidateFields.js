const NAO_EXISTE = 400;

const validateDate = date => {
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  return regexDate.test(date);
};

const Validate = (request, _response, next) => {
  try {
    if (!request.body) throw new Error('Deve conter um body obrigatório');

    const { body } = request;
    const { name, age, date } = body;

    const nameMinLength = 3;
    const ageMinLength = 18;

    if (!name) throw new Error('O campo "name" é obrigatório');

    if (name.length < nameMinLength)
      throw new Error('O "name" deve ter pelo menos 3 caracteres');

    if (!age) throw new Error('O campo "age" é obrigatório');

    if (parseInt(age) < ageMinLength)
      throw new Error('O crush deve ser maior de idade');

    if (!date || date.rate === undefined || !date.datedAt)
      throw new Error(
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      );

    const { datedAt, rate } = date;

    if (!validateDate(datedAt))
      throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');

    if (parseInt(rate) < 1 || parseInt(rate) > 5)
      throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');

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
