const express = require('express');
const fs = require('fs').promises;

const app = express();

const readCrush = async () => JSON.parse(await fs.readFile('./crush.json', 'utf8'));

app.get('/', async (req, res) => {
  const result = await readCrush();
  return res.status(200).send(result);
});

// app.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   if () {
//     res.status(200).send({

// });
//   } else {
//     res.status(404).send({
//       message: 'Crush não encontrado',
//     });
//   }
// });

module.exports = app;
