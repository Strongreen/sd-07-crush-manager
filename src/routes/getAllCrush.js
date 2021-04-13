const express = require('express');
const fs = require('fs');

const router = express.Router();

const crushList = 'crush.json';

router.get('/crush', async (_req, res) => {
  const crush = await fs.promises.readFile(crushList);
  if (crush) {
    return res.status(200).json(JSON.parse(crush));
  }
  return res.status(200).json([]);
});

module.exports = router;
