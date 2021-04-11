const express = require('express');

const router = express.Router();

const crypto = require('crypto');

function validationEmail(email) {
    // Referencia Luise rios
    const emailVerify = /\S+@\S+\.\S+/;
    return emailVerify.test(email);
}
 function validationPassword(password) {
    return password.toString().length < 6;
 }

router.post('/', (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'O campo "email" é obrigatório' }); 
    } if (!password) {
    return res.status(400).send({ 
    message: 'O campo "password" é obrigatório', 
    }); 
}
    if (validationPassword(password)) {
        return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' }); 
    } if (!validationEmail(email)) {
        return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    }
    const tokenvalidation = crypto.randomBytes(8).toString('hex');
    return res.status(200).send({ tokenvalidation });
});

module.exports = router;