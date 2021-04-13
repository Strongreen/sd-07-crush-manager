const express = require('express');
const crypto = require('crypto');
const { loginMiddleware } = require('../middlewares');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const router = express.Router();

router.use(loginMiddleware);

router.post('/', (_req, res) => {
  const token = tokenGenerator();
  res.send({ token });
});

module.exports = router;
