const express = require('express');

const router = express.Router();

const {
  getCrush,
  getCrushId,
  postCrush,
  putCrush,
  deleteCrush,
  queryCrush,
} = require('../Controllers/index');

const midauthToken = require('../middlewares/authToken');

const midpostCrush = require('../middlewares/postCrush');

const midupdateCrush = require('../middlewares/updateCrush');

router.get('/search', midauthToken, queryCrush);

router.get('/', getCrush);

router.get('/:id', getCrushId);

router.post('/', [midauthToken, midpostCrush], postCrush);

router.put('/:id', [midauthToken, midupdateCrush], putCrush);

router.delete('/:id', midauthToken, deleteCrush);

module.exports = router;
