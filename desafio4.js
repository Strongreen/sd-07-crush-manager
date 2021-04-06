const express = require('express');
const fs = require('fs').promises;
const helpers = require('./helper/validateCreate');

const app = express();

app.post('/crush', async (req, res) => {
  const crush = JSON.parse(await fs.readFile('./crush.json', 'utf8'));

  try {
    const newCrush = helpers.validateCreate(crush, req.body);

    const size = newCrush.length;
    await fs.writeFile('./crush.json', JSON.stringify(newCrush));
    res.status(201).json(newCrush[size - 1]);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
