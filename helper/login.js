const crypto = require('crypto');

const SUCCESS = 200;
const NOTFOUND = 400;

function login(req, res) {
  const cripto = crypto.randomBytes(12);
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { email, password } = req.body;
  const token = {
    token: cripto.toString('base64'),
  };
  
  if (!email) return res.status(NOTFOUND).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(NOTFOUND).send({ message: 'O campo "password" é obrigatório' });
  if (!validRegex.test(email)) {
    return res.status(NOTFOUND).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  if (password.length < 6) {
    return res.status(NOTFOUND).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } 

  res.status(SUCCESS).send(token);
}

module.exports = { login };
