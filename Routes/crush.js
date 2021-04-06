const express = require('express');

const router = express.Router();

const { getCrush, getCrushId, postCrush } = require('../Controllers/index');

router.get('/', getCrush);

router.get('/:id', getCrushId);

router.post('/', postCrush);

module.exports = router;
