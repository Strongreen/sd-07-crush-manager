const express = require('express');

const router = express.Router();
const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const emailval = /\S+@\S+\.\S+/.test(email);
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailval) {
    return res.status(400).json({ 
         message: 'O "email" deve ter o formato "email@email.com"' }); 
   }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
 return res.status(400).json({
       message: 'A "senha" deve ter pelo menos 6 caracteres' }); 
}

  return res.status(200).send({ token });
});

module.exports = router;