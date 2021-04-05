module.exports = (req, res, next) => {
  const { name, age, date } = req.body;
  // check name
  if (!name || name.length === 0) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  // check age
  if (!age || age.length === 0) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }
  // check dated
  if (!date) {
    return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  const { datedAt, rate } = date;

  if (!datedAt || !rate || datedAt.length === 0 || rate.length === 0) {
    return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!datedAt.includes('/')) {
    return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};
