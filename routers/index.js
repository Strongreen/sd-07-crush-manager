const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const middlewares = require('../middlewares');

const router = express.Router();

const crushJson = 'crush.json';
const crushInit = '/crush';
const crushRoute = '/crush/:id';

/* ---------- REQUISITO 1 ---------- */
router.get(crushInit, (_req, res) => {
  const data = JSON.parse(fs.readFileSync(crushJson, 'utf8'));
  if (!data.length) return res.status(200).json([]);
  res.status(200).json(data);
});

router.get('/crush/search', (req, res) => {
  let data = JSON.parse(fs.readFileSync(crushJson, 'utf8'));
  const { authorization } = req.headers;
  const { q: term } = req.query;
  middlewares.validToken(authorization);
  try {
    data = data.filter((crush) => crush.name.includes(term));
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
});

/* ---------- REQUISITO 2 -----------*/
router.get(crushRoute, (req, res) => {
  const data = JSON.parse(fs.readFileSync(crushJson, 'utf8'));
  let { id } = req.params;
  id = +id;
  const crushFind = data.find((crush) => crush.id === id);
  if (!crushFind) return res.status(404).json({ message: 'Crush não encontrado' });
  res.status(200).json(crushFind);
});

/* ----------- REQUISITO 3 ---------- */
router.post('/login', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  const validEmailResult = middlewares.validEmail(email);
  try {
    if (validEmailResult.error) return res.status(400).json({ message: validEmailResult.message });
    const validPasswordResult = middlewares.validPass(password);
    if (validPasswordResult.error) {
    return res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).send({ message: 'ta zuado o role' });
  }
});

/* ---------- REQUISITO 4 ---------- */
router.post(crushInit, (req, res) => {
  const data = JSON.parse(fs.readFileSync(crushJson, 'utf8'));
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const element = req.body;
  middlewares.validToken(authorization);
  middlewares.validForAll(element);
  try {
    data.push({ name, age, id: data.length + 1, date });
    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(data));
    res.status(201).json(data[data.length - 1]);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

/* ----------- REQUISITO 5 ---------- */
router.put(crushRoute, (req, res) => {
  const data = JSON.parse(fs.readFileSync(crushJson, 'utf8'));
  const element = req.body;
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, age, date } = req.body;
  try {
    middlewares.validToken(authorization);
    middlewares.validForAll(element);
    data[id - 1].name = name;
    data[id - 1].age = age;
    data[id - 1].date = date;
    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(data));
    return res.status(200).json(data[id - 1]);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

/* ----------- REQUISITO 6 ---------- */
router.delete(crushRoute, (req, res) => {
  const data = JSON.parse(fs.readFileSync(crushJson, 'utf8'));
  const { authorization } = req.headers;
  const { id } = req.params;
  middlewares.validToken(authorization);
  const index = Number(id - 1);
  data.splice(index, 1);
  try {
    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(data));
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
});

// router.use((err, _req, res, _next) => {
//   res.status(401).json({ message: err.message });
// });

module.exports = router;
