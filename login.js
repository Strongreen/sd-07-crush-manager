const express = require('express');

const app = express();

const verifyEmail = (email, res) => {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!email) {
        return res.status(400).send({
            message: 'O campo "email" é obrigatório',
          });
    }
    if (!regexEmail.test(email)) {
        return res.status(400).send({
            message: 'O "email" deve ter o formato "email@email.com"',
          });
    }
};

app.post('/', (req, res) => {
    const { email, password } = req.body;
    verifyEmail(email, res);
    if (!password) {
        return res.status(400).send({
            message: 'O campo "password" é obrigatório',
          });
    }
    if ((password.toString().length < 6)) {
        return res.status(400).send({
            message: 'A "senha" deve ter pelo menos 6 caracteres',
          });
    }
    res.status(200).send({
        token: '7mqaVRXJSp886CGr',
      });
});

module.exports = app;