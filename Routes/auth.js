const express = require('express');

const router = express.Router();

const validateEmailPassword = require('../Controllers/validateEmailPassword');

router.use(express.json());

router.post('/', async (req, res) => {
  const payload = req.body;
  
  const value = await validateEmailPassword(payload);

  if (typeof value === 'object') {
    res.status(400).send(value);
  }

  if (typeof value === 'string') {
    res.status(200).send({ token: value });
  }
});

module.exports = router;
