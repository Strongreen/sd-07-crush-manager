const express = require('express');

const router = express.Router();
const crypto = require('crypto');

const tokenGen = () => crypto.randomBytes(8).toString('hex');

router.post('/', (req, res, next) => {
    const { email, password } = req.body;

    const validator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email);
    if (!email) res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
    
    else if (!validator) {
 return res.status(400).json({ 
    message: 'O "email" deve ter o formato "email@email.com"', 
    }); 
}
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
    if (!password.length <= 6) {
        return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' }); 
    }

    res.status(200).json({ token: tokenGen() });

    next();
});

module.exports = router;