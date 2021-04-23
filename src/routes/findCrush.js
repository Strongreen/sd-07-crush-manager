const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { tokenMiddleware } = require('../middlewares');

const route = express.Router();

const dataDirectory = path.join(__dirname, '../../crush.json');

route.get('/crush/search', tokenMiddleware, async (req, res) => {
  const { q: phrase } = req.query;
  try {
    let data = await fs.readFile(dataDirectory);
    data = JSON.parse(data);
    data = data.filter((crush) => crush.name.includes(phrase));
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = route;