const express = require('express');
const crypto = require('crypto');

const { checkedEmailMidlleware, checkedPasswordMidlleware } = require('../middlewares');

const router = express.Router();
const SUCCESS = 200;

router.post('/', checkedEmailMidlleware, checkedPasswordMidlleware, (req, res) => {
  const token = crypto.randomBytes(16).toString('hex');
  return res.status(SUCCESS).send({ token });
});

module.exports = router;