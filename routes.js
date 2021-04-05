const express = require('express');
// const crypto = require('crypto');

const connection = require('./connection');
const addCrush = require('./middleware/addCrush');
const checkLogin = require('./middleware/checkLogin');
const checkToken = require('./middleware/checkToken');

const routes = express.Router();
// const generateToken = () => crypto.randomBytes(8).toString('hex');

routes.get('/crush', checkToken, async (req, res) => {
  const data = await connection.dbRead();
  res.status(201).send(data);
});

routes.get('/crush/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  const data = await connection.dbRead();
  res.status(201).send(data.filter((crush) => crush.id === Number(id)));
});

routes.post('/crush', checkToken, addCrush, async (req, res) => {
  const data = req.body;
  const newCrush = await connection.dbPush(data);
  res.status(201).send(newCrush);
});

routes.put('/crush/:id', checkToken, addCrush, async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const editedCrush = await connection.dbEdit(name, age, date, id);
  res.status(201).send(editedCrush);
});

routes.post('/login', checkLogin, (req, res) => {
  res.status(200).send({ token: '7mqaVRXJSp886CGr' });
  // res.status(200).send({ token: generateToken() });
});

module.exports = routes;
