const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { dataValidations, tokenMiddleware } = require('../middlewares');

const route = express.Router();

const dataDirectory = path.join(__dirname, '../../crush.json');

route.post('/crush', tokenMiddleware, dataValidations, async (req, res) => {
  let crushes = await fs.readFile(dataDirectory);
  crushes = JSON.parse(crushes);
  const id = crushes.length + 1;
  const size = crushes.length;
  const { name, age, date } = req.body;
  crushes[size] = {
    id, name, age, date: { datedAt: date.datedAt, rate: date.rate },
  };
  try {
    await fs.writeFile(dataDirectory, JSON.stringify(crushes));
    const resp = crushes[size];
    return res.status(201).json(resp);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = route;