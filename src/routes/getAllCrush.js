const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const findCrush = require('./findCrush');

const route = express.Router();
const dataDiretory = path.join(__dirname, '../../crush.json');

route.get('/crush', async (_req, res) => {
  const crushes = await fs.readFile(dataDiretory);
  if (crushes.length > 0) return res.status(200).json(JSON.parse(crushes));
  return res.status(200).json([]);
});

route.use(findCrush);

module.exports = route;
