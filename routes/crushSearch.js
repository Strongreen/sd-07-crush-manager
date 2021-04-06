const express = require('express');

const middlewares = require('../middlewares');

const router = express.Router();

router.get('/crush/search', middlewares.checkToken, middlewares.searchCrushMiddware);

module.exports = router;