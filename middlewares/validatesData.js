const validDate = (date) => {
  const re = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  return re.test(date);
};

const messageError = {
  name_required: 'O campo "name" é obrigatório',
  name_length: 'O "name" deve ter pelo menos 3 caracteres',
  age_required: 'O campo "age" é obrigatório',
  age_less_than_eighteen: 'O crush deve ser maior de idade',
  date_required: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  date_format_invalid: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
  rate_is_not_number: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const fieldNotExists = (value) => (!value);
const isLengthLetterThan = (value, min) => (value.length < min);
const subfieldNotExists = (value) => 
  (!value || value.datedAt === undefined || value.rate === undefined);
const fieldBetweenTwoValues = (value, min, max) => 
  (parseInt(value.rate, 10) < min || parseInt(value.rate, 10) > max);

const validatesNameAge = (req, res, next) => {
  const { name, age } = req.body;

  switch (true) {
    case fieldNotExists(name):
      return res.status(400).json({ message: messageError.name_required });
    case isLengthLetterThan(name, 3):
      return res.status(400).json({ message: messageError.name_length });
    case fieldNotExists(age):
      return res.status(400).json({ message: messageError.age_required });
    case isLengthLetterThan(parseInt(age, 10), 18):
      return res.status(400).json({ message: messageError.age_less_than_eighteen });
    default: next();
  }
};

const validatesDate = (req, res, next) => {
  const { date } = req.body;

  switch (true) {
    case subfieldNotExists(date):
      return res.status(400).json({ message: messageError.date_required });
    case !validDate(date.datedAt):
      return res.status(400).json({ message: messageError.date_format_invalid });
    case fieldBetweenTwoValues(date.rate, 1, 5):
      return res.status(400).json({ message: messageError.rate_is_not_number });
    default: next();
  }
};

module.exports = { validatesNameAge, validatesDate };

// if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
// if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

// if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
// if ((parseInt(age, 10)) < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

// if (!date || date.datedAt === undefined || date.rate === undefined) {
//   return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
// }

// if (!validDate(date.datedAt)) {
//   return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
// }

// if (parseInt(date.rate, 10) < 1 || parseInt(date.rate, 10) > 5) {
//   return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
// }