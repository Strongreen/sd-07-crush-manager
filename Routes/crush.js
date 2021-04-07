const express = require('express');

const router = express.Router();

const { getCrush, getCrushId, postCrush, putCrush } = require('../Controllers/index');

const midauthToken = require('../middlewares/authToken');

const midpostCrush = require('../middlewares/postCrush');

const midupdateCrush = require('../middlewares/updateCrush');

router.get('/', getCrush);

router.get('/:id', getCrushId);

router.post('/', [midauthToken, midpostCrush], postCrush);

router.put('/:id', [midauthToken, midupdateCrush], putCrush);

module.exports = router;
