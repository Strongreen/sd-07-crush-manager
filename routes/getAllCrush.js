const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const route = express.Router();
const dataPath = path.join(__dirname, '../../crush.json');

route.get('/crush', async (_req, res) => {
  const allCrush = await fs.readFile(dataPath);
  if (allCrush > 0) return res.status(200).json(JSON.parse(allCrush));
  return res.status(200).json([]);
});

module.exports = route;