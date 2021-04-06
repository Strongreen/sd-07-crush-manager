const express = require('express');

const router = express.Router();

const { getCrush, getCrushId, postCrush } = require('../Controllers/index');

const authToken = require('../middlewares/authToken');

const searchCrush = require('../middlewares/searchCrush');

router.get('/', getCrush);

router.get('/:id', getCrushId);

router.post('/', [authToken, searchCrush], postCrush);

module.exports = router;
