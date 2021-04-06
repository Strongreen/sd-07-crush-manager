const express = require('express');

const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const readFileCrush = require('../functions/readFileCrush');

router.get('/', validateToken, async (req, res) => {
  const { q } = req.query;
  const crushs = await readFileCrush();

  if (!q) return res.status(200).send(crushs);

  const arrayFiltred = crushs.filter((crush) => crush.name.includes(q));

  res.status(200).send(arrayFiltred);
});

module.exports = router;
