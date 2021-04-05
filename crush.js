const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const crushFile = fs.readFileSync('./crush.json', 'utf8');

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  if (crushFile.length === 0) {
    res.status(200).send([]);
  } else {
    res.status(200).send(crushFile);
  }
});

// function isValidId(id) {
//   // return crushFile.find((item) => item.id === id);
//   JSON.parse(crushFile);
//   console.log(crushFile);
//   console.log(typeof crushFile);
//   console.log(typeof JSON.parse(crushFile));
//   console.log(Array.isArray(crushFile));
//   console.log(JSON.parse(crushFile).find((item) => item.id === id));
// }

// app.get('/:id', (req, res) => {
//   const isId = isValidId(req.params.id);
//   if (isId) {
//     res.status(200).send(isId);
//   } else {
//     res.status(404).send({ message: 'Crush não encontrado' });
//   }
// });

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

module.exports = app;
