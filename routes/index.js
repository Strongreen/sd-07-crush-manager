const express = require('express');
const fs = require('fs');

const app = express();
const sucess = 200;
// const erro = 400;

app.get('/', (_request, response) => {
  response.status(sucess).send();
});

app.get('/crush', (_req, res) => {
  const dataCrush = JSON.parse(
    fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8'),
  );
  if (dataCrush.length > 0) {
    return res.status(sucess).send(dataCrush);
  }
  return res.status(sucess).send([]);
});

// app.get('/crush/:id', (req, res) => {
//     res.status(sucess).send();
// });

app.get('/crush/search?q=searchTerm', (req, res) => {
  res.status(sucess).send();
});

app.post('/login', (req, res) => {
  res.status(sucess).send('user');
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
