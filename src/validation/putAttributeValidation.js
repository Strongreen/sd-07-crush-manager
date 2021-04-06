const express = require('express');

const router = express.Router();

const middleware = require('../middleware');

router.put('/crush/:id1', middleware.tokenMiddleware);
router.put('/crush/:id2', middleware.nameMiddleware);
router.put('/crush/:id3', middleware.ageMiddleware);
router.put('/crush/:id4', middleware.dateMiddleware);
router.put('/crush/:id5', middleware.dateObjectMiddleware);
router.put('/crush/:id6', middleware.dateAttributeMiddleware);

module.exports = router;
