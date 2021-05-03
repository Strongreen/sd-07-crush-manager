const express = require('express');

const router = express.Router();

const midwares = require('../middlewares');

router.post(
  '/',
  midwares.emailMid,
  midwares.passwordMid,
  midwares.requestTokenMid,
);

module.exports = router;
