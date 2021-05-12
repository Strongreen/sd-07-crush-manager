const routes = require('express').Router();
const crypto = require('crypto');

routes.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!/\w+@+\w+.com/.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const token = crypto.createHash('md5').update(email + password).digest('hex').slice(0, 16);
  return res.status(200).json({ token });
});

module.exports = routes;
