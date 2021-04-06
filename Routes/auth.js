const express = require('express');

const router = express.Router();

const validateEmailPassword = require('../Controllers/validateEmailPassword');

router.use(express.json());

router.post('/', (req, res) => {
  const payload = req.body;
  
  const value = validateEmailPassword(payload);

  if (typeof value === 'object') {
    res.status(400).send(value);
  }

  if (typeof value === 'string') {
    res.status(200).send({ token: value });
  }
});

module.exports = router;
