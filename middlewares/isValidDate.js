const dateIs = {
  datedAtInvalid: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
  rateInvalid: 'O campo "rate" deve ser um inteiro de 1 à 5',
  dateInvalid: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};

const FAIL = 400;

const isRateValid = (rate = -1) => {
 const rateInteger = parseInt(rate, 10);
 console.log(rate);
 return (rateInteger > 0 && rateInteger <= 5);
};
const isDatedAtValid = (datedAt = '111') => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return regex.test(datedAt);
};
const dateValid = (date) => date && date.datedAt && Number.isInteger(date.rate);

function isValidDate(request, response, next) {
  const { date } = request.body;
  const { datedAt, rate } = dateValid(date) ? date : { datedAt: undefined, rate: undefined };
  
  if (!dateValid(date)) {
    response.status(FAIL).send({ message: dateIs.dateInvalid });
  } else if (!isDatedAtValid(datedAt)) {
    response.status(FAIL).send({ message: dateIs.datedAtInvalid });
  } else if (!isRateValid(rate)) {
    response.status(FAIL).send({ message: dateIs.rateInvalid });
  } else {
    next();
  }
}

module.exports = isValidDate;