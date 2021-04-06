const BAD_REQUEST = 400;

const regex = {
  DATE: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
  RATE: /\b[1-5]\b/,
};

const erroDate = {
  NULL: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  INVALID_FORMAT_DATE: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
  INVALID_FORMAT_RATE: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

module.exports = (request, response, next) => {
  const { date } = request.body;
  const { datedAt, rate } = date;

  if (!datedAt || !rate) {
 return response.status(BAD_REQUEST)
    .json({ message: erroDate.NULL });
  }
  if (!regex.DATE.test(datedAt)) {
 return response.status(BAD_REQUEST)
    .json({ message: erroDate.INVALID_FORMAT_DATE });
  }
  if (!regex.RATE.test(rate)) {
 return response.status(BAD_REQUEST)
    .json({ message: erroDate.INVALID_FORMAT_RATE });
  }
  next();
};