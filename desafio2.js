const express = require('express');

const app = express();
const fs = require('fs').promises;

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const crush = JSON.parse(await fs.readFile('./crush.json'));
    const filter = crush.filter((person) => person.id === parseInt(id, 10));
    if (filter.length > 0) {
      res.status(200).json(filter[0]);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).json({
      message: 'Crush não encontrado',
    });
  }
});
module.exports = app;
