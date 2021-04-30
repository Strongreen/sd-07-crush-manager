const express = require('express');

const router = express.Router();
const crypto = require('crypto');
const emailMidleware = require('../middlewares/email');
const passwordMidleware = require('../middlewares/password');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post('/', emailMidleware, passwordMidleware, (_req, res) => {
  try {
    const token = generateToken();
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(`Deu ruim. Mensagem: ${err.message}`);
  }
});

module.exports = router;
