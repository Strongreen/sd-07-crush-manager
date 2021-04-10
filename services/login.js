const express = require('express');
const {
  emailAuth,
} = require('../validateFunctions.js');

const router = express.Router(); 
const SUCCESS = 200;

router.post('/login', emailAuth, (req, res) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  return res.status(SUCCESS).json({
    token: '7mqaVRXJSp886CGr',
  });
});

module.exports = router;
