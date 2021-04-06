const express = require('express');
const fs = require('fs');

const app = express();

function getCrushs() {
    return fs.promises
      .readFile(`${__dirname}/../crush.json`, 'utf8')
      .then((content) => content)
      .then((stringified) => JSON.parse(stringified))
      .catch((error) => error.message);
  } 

app.get('/', async (_req, res) => {
    const crushs = await getCrushs();
    return res.status(200).send(crushs);
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const notFound = { message: 'Crush não encontrado' };
    const crushs = await getCrushs();
    const crush = crushs[id - 1];
    if (crush) return res.status(200).send(crush);
    return res.status(404).send(notFound);
});

/* 
  function setCrushs(index, newCrush) {
    data[index] = newCrush;
    fs.promises
      .writeFile(data, JSON.stringify(data), 'utf8')
      .then(() => {
        console.log('Crush adicionado com sucesso!');
      })
      .catch((error) => {
        console.error(error.message);
      });
  } */

module.exports = app;
