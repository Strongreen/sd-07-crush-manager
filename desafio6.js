const express = require('express');
const fs = require('fs').promises;
const helpers = require('./helper/validateCreate');

const app = express();

app.delete('/crush/:id', async (req, res) => {
  const crush = JSON.parse(await fs.readFile('./crush.json', 'utf8'));
  const id = parseInt(req.params.id, 10);
  try {
    const updateCrush = helpers.deleteCrush(crush, id);

    await fs.writeFile('./crush.json', JSON.stringify(updateCrush));
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
