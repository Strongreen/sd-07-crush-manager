const errNoName = { message: 'O campo "name" é obrigatório' };
const errNoAge = { message: 'O campo "age" é obrigatório' };
const errInvalidName = { message: 'O "name" deve ter pelo menos 3 caracteres' };
const errInvalidAge = { message: 'O crush deve ser maior de idade' };

module.exports = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return res.status(400).send(errNoName);
  if (name.length < 3) return res.status(400).send(errInvalidName);
  if (!age) return res.status(400).send(errNoAge);
  if (age < 18) return res.status(400).send(errInvalidAge);
  next();
};
