const express = require('express');

const router = express.Router();
const midwares = require('../middlewares');

router.post('/', midwares.loginCheckEmail, midwares.passwordCheck, midwares.requesToken);

module.exports = router;