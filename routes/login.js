const express = require('express');

const router = express.Router();
const crypto = require('crypto');

function token() {
    return crypto.randomBytes(8).toString('hex');
  }

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    const validator = /\S+@\S+\.\S+/.test(email);
    if (email) return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
    if (!validator) {
 return res.status(400).json({ 
    message: 'O "email" deve ter o formato "email@email.com"', 
    }); 
}
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
    if (password.length < 6) {
        return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' }); 
    }
    // Referencia Emanuelle Brasil
    res.status(200).json({ token: token() });

    next();
});

module.exports = router;