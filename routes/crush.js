const express = require('express');
// const fs = require('fs');
const data = require('../crush.json');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send(data);
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const crush = data[id - 1];
    res.status(200).send(crush);
});


/* function getCrushs() {
    fs.promises
      .readFile(data, 'utf8')
      .then((content) => {
        console.log(content);
      })
      .catch((error) => {
        console.error(error.message);
      });
  } */

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
