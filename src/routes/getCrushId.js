const express = require('express');

const router = express.Router();

const dataCrush = require('../../crush.json');

router.get('/crush/:id', (req, res) => {
  const { id: reqId } = req.params;
  const crushId = dataCrush.find(({ id }) => id === Number(reqId));
  if (crushId) {
    return res.status(200).json(crushId);
  }
  return res.status(404).json({
    message: 'Crush não encontrado',
  });
});

router.get('/crush', (_req, res) => res.status(200).json(dataCrush));

module.exports = router;
