const express = require('express');

const router = express.Router();

const middleware = require('../middleware');

router.post('/crush', middleware.tokenMiddleware);
router.post('/crush', middleware.nameMiddleware);
router.post('/crush', middleware.ageMiddleware);
router.post('/crush', middleware.dateMiddleware);
router.post('/crush', middleware.dateObjectMiddleware);
router.post('/crush', middleware.dateAttributeMiddleware);

module.exports = router;
