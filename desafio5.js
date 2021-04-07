const express = require('express');
const fs = require('fs').promises;
const helpers = require('./helper/validateCreate');

const app = express();

function handleEdit(req, id) {
  const { name, age, date } = req.body;
  return {
    id,
    name,
    age,
    date,
  };
}

app.put('/crush/:id', async (req, res) => {
  const crush = JSON.parse(await fs.readFile('./crush.json', 'utf8'));
  const id = parseInt(req.params.id, 10);
  try {
    const newCrushEdit = handleEdit(req, id);
    const newObject = helpers.validateEdit(crush, newCrushEdit);

    await fs.writeFile('./crush.json', JSON.stringify(newObject));
    res.status(200).json(newObject[parseInt(id, 10) - 1]);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
