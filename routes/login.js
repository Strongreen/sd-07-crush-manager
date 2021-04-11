const express = require('express');

const router = express.Router();
const crypto = require('crypto');

function validationEmail(email) {
    // Referencia Luise Rios
  const emailval = /\S+@\S+\.\S+/;
  return emailval.test(email);
}

function validationPassword(password) {
  return password.toString().length < 6;
}

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validationEmail(email)) {
    return res.status(400).json({ 
         message: 'O "email" deve ter o formato "email@email.com"' }); 
   }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (validationPassword(password)) {
 return res.status(400).json({
       message: 'A "senha" deve ter pelo menos 6 caracteres' }); 
}

  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).send({ token });
});

module.exports = router;