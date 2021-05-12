const routes = require('express').Router();
const crypto = require('crypto');

const errors = {
  EMAIL_MISSING: 'O campo "email" é obrigatório',
  EMAIL_INVALID: 'O "email" deve ter o formato "email@email.com"',
  PASS_MISSING: 'O campo "password" é obrigatório',
  PASS_INVALID: 'A "senha" deve ter pelo menos 6 caracteres',
};

routes.post('/', (req, res) => {
  const { email, password } = req.body;
  
  if (!email) return res.status(400).json({ message: errors.EMAIL_MISSING });
  if (!/\w+@+\w+.com/.test(email)) return res.status(400).json({ message: errors.EMAIL_INVALID });

  if (!password) return res.status(400).json({ message: errors.PASS_MISSING });
  if (password.length < 6) return res.status(400).json({ message: errors.PASS_INVALID });

  const token = crypto.createHash('md5').update(email + password).digest('hex').slice(0, 16);
  return res.status(200).json({ token });
});

module.exports = routes;
