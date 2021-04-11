const { Router } = require('express');
const { generateToken } = require('../helpers');

const router = Router();

const SUCCESS = 200;

router.post('/', (_req, res) => {
  const token = generateToken();
  res.status(SUCCESS).json({ token });
}); 

module.exports = router;
