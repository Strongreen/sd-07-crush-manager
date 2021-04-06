const express = require('express');

const app = express();
const fs = require('fs');

app.get('/crush', async (req, res) => {
  try {
    const crush = JSON.parse(fs.readFileSync('./crush.json'));
    res.status(200).json(crush);
  } catch (error) {
    res.status(200).json([]);
  }
});

module.exports = app;
