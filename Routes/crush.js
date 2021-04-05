const express = require('express');

const router = express.Router();

const { getCrush, getCrushId } = require('../Controllers/index');

router.get('/', getCrush);

router.get('/:id', getCrushId);

module.exports = router;
