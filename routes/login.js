const express = require('express');
const crypto = require('crypto');

const router = express.Router();

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return regex.test(email);
  }

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (password.toString().length < 6) {
        return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }
    return res.json({ token: crypto.randomBytes(8).toString('hex') });
});

module.exports = router;
