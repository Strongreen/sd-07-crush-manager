const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const SUCCESS = 200; 

router.get('/', async (_req, res) => {
  const file = await fs.readFile('./crush.json');
  const result = JSON.parse(file.toString('utf-8'));
  res.status(SUCCESS).send(result);
});

module.exports = router;