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

const {
  notDoneName,
  notDoneAge,
  notDoneRate,
  notDoneDateDatedatrate,
  fnRegexDate,
} = require('../middlewares/crush');

router.get('/search', midauthToken, queryCrush);

router.get('/', getCrush);

router.get('/:id', getCrushId);

router.post('/', [
  midauthToken,
  notDoneName,
  notDoneAge,
  notDoneRate,
  notDoneDateDatedatrate,
  fnRegexDate], postCrush);

router.put('/:id', [
  midauthToken,
  notDoneName,
  notDoneAge,
  notDoneRate,
  notDoneDateDatedatrate,
  fnRegexDate], putCrush);

router.delete('/:id', midauthToken, deleteCrush);

module.exports = router;
