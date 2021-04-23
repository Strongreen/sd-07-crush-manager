const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { tokenMiddleware, dataValidations } = require('../middlewares');

const route = express.Router();

const dataDirectory = path.join(__dirname, '../../crush.json');

route.put('/crush/:id', tokenMiddleware, dataValidations, async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  let crushes = await fs.readFile(dataDirectory);
  crushes = JSON.parse(crushes);
  const crush = crushes.find((element) => element.id === +req.body.id);
  const index = crushes.indexOf(crush);
  crushes[index] = { name, age, id: +id, date: { datedAt: date.datedAt, rate: date.rate } };
  try {
    await fs.writeFile(dataDirectory, JSON.stringify(crushes));
    const resp = crushes[index];
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = route;