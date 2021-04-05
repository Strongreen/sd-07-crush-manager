const express = require('express');
const fs = require('fs');
const dataCrush = require('../crush.json');

const app = express();
const sucess = 200;
// const fail = 400;

app.get('/', (_request, response) => {
  response.status(sucess).send();
});

app.get('/crush', (req, res) => {
  fs.readFile(dataCrush, 'utf-8', (err, data) => {
    if (err) throw err;
    res.status(sucess).send(data);
  });
});

// app.get('/crush/:id', (req, res) => {
//     res.status(sucess).send();
// });

app.get('/crush/search?q=searchTerm', (req, res) => {
  res.status(sucess).send();
});

app.post('/login', (req, res) => {
  res.status(sucess).send();
});

app.post('/crush', (req, res) => {
  res.status(sucess).send();
});

app.put('/crush/:id', (req, res) => {
  res.status(sucess).send();
});

app.delete('/crush/:id', (req, res) => {
  res.status(sucess).send();
});

module.exports = app;
