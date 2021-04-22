const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { dataValidations, tokenMiddleware } = require('../middlewares');
const data = require('../../crush.json');

const route = express.Router();

const dataDirectory = path.join(__dirname, '../../crush.json');

route.post('/crush', tokenMiddleware, dataValidations, async (req, res) => {  
  const id = data.length + 1;
  const size = data.length;
  const { name, age, date } = req.body;
  data[size] = {
    id, name, age, date: { datedAt: date.datedAt, rate: date.rate },
  };
  try {
    await fs.writeFile(dataDirectory, JSON.stringify(data));
    const resp = data[size];
    res.status(201).json(resp);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = route;