const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const crushModels = require('../models/crushModels');

const app = express();
app.use(express.json());

const router = express.Router();

const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
const crushInit = '/crush';
const crushRoute = '/crush/:id';

/* ---------- REQUISITO 1 ---------- */
router.get(crushInit, (_req, res) => {
  if (data.length === 0) {
    return res.status(200).send([]);
  }
  res.status(200).json(data);
});

/* ---------- REQUISITO 2 -----------*/
router.get(crushRoute, (req, res) => {
  /* console.log(data2); */
  const { id } = req.params;
  const crushId = parseInt(id, 10);
  const crushFind = data.find((crush) => crush.id === crushId);
  if (crushFind) res.status(200).json(crushFind);
  return res.status(404).json({ message: 'Crush não encontrado' });
});

/* ----------- REQUISITO 3 ---------- */
router.post('/login', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  try {
    const validEmailResult = crushModels.validEmail(email);
    if (validEmailResult.error) {
      return res.status(400).json({ message: validEmailResult.message });
    }
    const validPasswordResult = crushModels.validPass(password);
    if (validPasswordResult.error) {
      return res.status(400).json({ message: validPasswordResult.message });
    }
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).send({ message: 'ta zuado o role' });
  }
});

/* ---------- REQUISITO 4 ---------- */
router.post(crushInit, (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const element = req.body;
  const authorizationResult = crushModels.validToken(authorization);
  if (authorizationResult === false) {
    return res.status(401).json({ message: authorizationResult.message });
  }
  res.status(401).json({ message: authorizationResult.message });
  try {
    crushModels.validForAll(element);
    data.push({ name, age, id: data.length + 1, date });
    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(data));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  return res.status(201).json({ message: data[data.length - 1] });
});

/* ----------- REQUISITO 5 ---------- */
router.put(crushRoute, (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, age, date } = req.body;
  const authorizationResult = crushModels.validToken(authorization);
  if (authorizationResult === false) {
    return res.status(401).json({ message: authorizationResult.message });
  }
  res.status(401).json({ message: authorizationResult.message });
  data[id - 1].name = name;
  data[id - 1].age = age;
  data[id - 1].date = date;
  try {
    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(data));
    return res.status(200).send({ message: 'Personagem adicionado' });
  } catch (error) {
    throw new Error(error);
  }
});

/* ----------- REQUISITO 6 ---------- */
router.delete(crushRoute, (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const authorizationResult = crushModels.validToken(authorization);
  if (authorizationResult === false) {
    return res.status(401).json({ message: authorizationResult.message });
  }
  res.status(401).json({ message: authorizationResult.message });
  const index = Number(id - 1);
  data.splice(index, 1);
  try {
    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(data));
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
});

router.use((err, _req, res, _next) => {
  res.status(400).json({ message: err.message });
});

module.exports = router;