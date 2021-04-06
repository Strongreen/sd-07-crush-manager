const express = require('express');
// const crypto = require('crypto');

const connection = require('./connection');
const addCrush = require('./middleware/addCrush');
const checkLogin = require('./middleware/checkLogin');
const checkToken = require('./middleware/checkToken');

const routes = express.Router();
// const generateToken = () => crypto.randomBytes(8).toString('hex');

routes.get('/crush', async (req, res) => {
  const data = await connection.dbRead();
  res.status(200).send(data);
});

routes.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const data = await connection.dbRead();
  const crush = data.filter((crushX) => crushX.id === Number(id));
  if (!crush[0]) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(200).send(crush[0]);
});

routes.post('/crush', checkToken, addCrush, async (req, res) => {
  const { name, age, date } = req.body;
  const newCrush = await connection.dbPush(name, age, date);
  res.status(201).send(newCrush);
});

routes.put('/crush/:id', checkToken, addCrush, async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  await connection.dbEdit();
  res.status(200).send({
    name,
    age,
    date,
    id: Number(id),
  });
});

routes.post('/login', checkLogin, (req, res) => {
  res.status(200).send({ token: '7mqaVRXJSp886CGr' });
  // res.status(200).send({ token: generateToken() });
});

module.exports = routes;
