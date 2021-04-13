const express = require('express');
const fs = require('fs');
const {
  authMiddleware,
  dateMiddleware,
  nameAgeMiddleware,
  rateMiddleware,
} = require('../middleware/authMiddleware');

const app = express();

const fileCrush = () => {
  const crushJson = fs.readFileSync(`${__dirname}/../crush.json`);
  return JSON.parse(crushJson.toString('utf-8'));
};

app.get('/', (req, res) => {
  const data = fileCrush();
  return res.status(200).send(data);
});

app.use(authMiddleware);
app.use(nameAgeMiddleware);
app.use(dateMiddleware);
app.use(rateMiddleware);

app.post('/', (req, res) => {
  const crusher = fileCrush();
  const newCrush = { id: crusher.length + 1, ...req.body };
  const newArray = [...crusher, newCrush];
  console.log(newArray);
  return res.status(201).send(newCrush);
});

module.exports = app;
