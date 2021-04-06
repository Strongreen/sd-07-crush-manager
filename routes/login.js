const crypto = require('crypto');
const express = require('express');

const app = express.Router();

const gerarToken = () => {
    const token = crypto.randomBytes(8).toString('hex');
    return {
      token,
    };
  };
  
  const validaEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
  
  const validaSenha = (senha) => {
    const tamanho = 6;
    if (senha.toString().length >= tamanho) return senha;
  };
  
  const condicoesEmail = (req, res) => {
    const { email } = req.body;
    switch (true) {
      case !email:
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
      case !validaEmail(email):
        console.log(validaEmail(email));
        return res
          .status(400)
          .json({ message: 'O "email" deve ter o formato "email@email.com"' });
      default:
       break;
  }
  };
  
  const condicaoPassword = (req, res) => {
    const { password } = req.body;
    switch (true) {
      case !password:
        return res
          .status(400)
          .json({ message: 'O campo "password" é obrigatório' });
      case !validaSenha(password):
        return res
          .status(400)
          .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
      default:
        return res.status(200).json(gerarToken());
    }
  };
  
  app.post('/', (req, res) => {
    condicoesEmail(req, res);
    condicaoPassword(req, res);
  });

  module.exports = app; 
