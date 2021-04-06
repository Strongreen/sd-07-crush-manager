const express = require('express');
const fs = require('fs');
const data = require('../crush.json');

const app = express();
const sucess = 200;
 const notFound = 404;

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

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const newData = data.filter((acc) => acc.id === parseInt(id, 2));
  try {
    if (newData.length > 0) {
      return res.status(sucess).send(newData[0]);
    }
    return res.status(notFound).send({ message: 'Crush não encontrado' });
  } catch (error) {
    throw new Error(error);
  }
});

app.get('/crush/search?q=searchTerm', (req, res) => {
  res.status(sucess).send();
});

app.post('/login', (req, res) => {
  res.status(sucess).send('user');
});

app.post('/crush', (req, res) => {
  res.status(sucess).send();
});

// app.put('/crush/:id', (req, res) => {
//   res.status(sucess).send();
// });

app.delete('/crush/:id', (req, res) => {
  res.status(sucess).send();
});

module.exports = app;
