const express = require('express');
const fs = require('fs').promises;
const helpers = require('./helper/validateCreate');

const app = express();

app.get('/crush/search', async (req, res) => {
  console.log(req.query.q);
  const crush = JSON.parse(await fs.readFile('./crush.json', 'utf8'));
  try {
    const filterName = helpers.filterByName(crush, req.query.q);
    res.status(200).json(filterName);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
