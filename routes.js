const routes = require('express').Router();
const { readFile } = require('fs').promises;

routes.get('/crush', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('./crush.json', 'utf8'));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = routes;
