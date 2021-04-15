const express = require('express');

const router = express.Router();

const midwares = require('../middlewares');

router.post(
  '/',
  midwares.emailMiddleware,
  midwares.passwordMiddleware,
  midwares.requestTokenMidware,
);

module.exports = router;
