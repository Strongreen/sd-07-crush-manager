const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');
const validations = require('../controllers/index');
const { checkDate, checkAge, checkName } = require('../controllers/index');
const checkAuthorization = require('../middlewares/authorization');
const createdCrush = require('../models/createCrush');
const { readFile, writeFile } = require('../services/readAndWrite');

const { emailValidation, passwordValidation } = validations;
const app = express.Router();
const SUCCESS = 200;
const REJECT_REQUEST = 400;
const idRoute = 'id';
app.use(express.json());

app.get('/crush/search', checkAuthorization, async (req, res) => {
  const result = await readFile();
  const { q } = req.query;
  const crushMatchers = result.filter((crushData) => crushData.name.includes(q));
  if (!crushMatchers) return res.status(SUCCESS).send(result);
  if (crushMatchers.length === 0) return res.status(200).send([]);

  try {
    return res.status(200).send(crushMatchers);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

app.get('/crush', (req, res) => {
  fs.readFile(`${__dirname}/../crush.json`, 'utf-8')
    .then((result) => res.status(SUCCESS).send(JSON.parse(result)))
    .catch((_err) => console.log(_err));
});

app.get(`/crush/:${idRoute}`, async (req, res) => {
  const { id } = req.params;
  const data = await JSON.parse(await fs.readFile(`${__dirname}/../crush.json`, 'utf-8'));
  const find = data.find((elem) => parseInt(id, 10) === elem.id);
  if (find) return res.status(SUCCESS).send(find);
  res.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const emailResult = emailValidation(email);
  const passwordResult = passwordValidation(password);

  try {
    if (emailResult.error) {
      return res.status(REJECT_REQUEST).send({ message: emailResult.message });
    }
    if (passwordResult.error) {
      return res.status(REJECT_REQUEST).json({
        message: passwordResult.message,
      });
    }
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(SUCCESS).send({ token });
  } catch (err) {
    console.log(err);
  }
});

app.post('/crush', checkAuthorization, async (req, res) => {
  const { name, age, date } = req.body;
  const checkNameResult = checkName(name, 'name');
  const checkAgeResult = checkAge(age, 'age');
  const checkDateResult = checkDate(date, 'date');
  if (checkNameResult.error) return res.status(400).send({ message: checkNameResult.message }); 
  if (checkAgeResult.error) return res.status(400).send({ message: checkAgeResult.message }); 
  if (checkDateResult.error) return res.status(400).send({ message: checkDateResult.message }); 
  const create = await createdCrush(name, age, date);
  try {
    return res.status(201).json(create);
  } catch (err) {
    console.log(err.message);
  }
});
app.put('/crush/:id', checkAuthorization, async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const checkNameResult = checkName(name, 'name');
  const checkAgeResult = checkAge(age, 'age');
  const checkDateResult = checkDate(date, 'date');
  if (checkNameResult.error) { return res.status(400).send({ message: checkNameResult.message }); }
  if (checkAgeResult.error) { return res.status(400).send({ message: checkAgeResult.message }); }
  if (checkDateResult.error) { return res.status(400).send({ message: checkDateResult.message }); }
  const result = await readFile();
  const crushIndex = result.findIndex((crushData) => crushData.id === Number(id));
  result[crushIndex] = { id: Number(id), name, age, date };
  try {
    await writeFile(result);
    return res.status(200).send(result[crushIndex]);
  } catch (err) {
    const message = { message: 'Crush não encontrado' };
    return res.status(404).send(message);
  }
});
app.delete('/crush/:id', checkAuthorization, async (req, res) => {
  const { id } = req.params;
  const result = await readFile();
  const deletedCrushList = result.filter((element) => element.id === Number(id));
  await writeFile(deletedCrushList);
  return res.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = app;
