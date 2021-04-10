const validatedToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) { return res.status(401).json({ message: 'Token não encontrado' }); }
  if (authorization.length !== 16) { return res.status(401).json({ message: 'Token inválido' }); }
  next();
};

const validatedNameAge = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) { return res.status(400).json({ message: 'O campo "name" é obrigatório' }); }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) { return res.status(400).json({ message: 'O campo "age" é obrigatório' }); }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }

  next();
};

const err = {
  dateM: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
  formatM: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
  rateM: 'O campo "rate" deve ser um inteiro de 1 à 5',
};
const formatDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
const isInvalidDate = (date) => !date || !date.datedAt || (!date.rate && date.rate !== 0);

const validatedDate = (req, res, next) => {
  const { date } = req.body;

  if (isInvalidDate(date)) { return res.status(400).json({ message: err.dateM }); }

  const { datedAt, rate } = date;
  if (!formatDate.test(datedAt)) { return res.status(400).json({ message: err.formatM }); }  
  if (rate < 1 || rate > 5) { return res.status(400).json({ message: err.rateM }); }
  next();
};

module.exports = {
  validatedToken,
  validatedNameAge,
  validatedDate,
};