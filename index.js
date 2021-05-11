const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const emailValidator = require('./_helpers/emailValidator.js');
const generateToken = require('./_helpers/generateToken.js');
const passwordValidator = require('./_helpers/passwordValidator.js');
const readFilesPromise = require('./_helpers/readFilesPromise.js');
const validToken = require('./_helpers/validToken.js');
const validateName = require('./_helpers/validateName.js');
const validateAge = require('./_helpers/validateAge.js');
const validateDateValues = require('./_helpers/validateDateValues.js');
const validateDateEmpty = require('./_helpers/validateDateEmpty');
const validateDateAtRateEmpty = require('./_helpers/validateDateAtRateEmpty');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const PATH = './crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// requirement 1
app.get('/crush', (req, res) => {
  readFilesPromise(PATH)
    .then((resolve) => res.status(200).send(resolve))
    .catch(() => res.status(200).send());
});

// requirement 2
app.get('/crush/:id', (req, res) => {
  const { id: idCrush } = req.params;
  readFilesPromise(PATH)
    .then((resolve) => {
      const crush = resolve.find(({ id }) => id === parseInt(idCrush, 10));
      if (!crush) res.status(404).send({ message: 'Crush não encontrado' });
      res.status(200).send(crush);
    })
    .catch(() => res.status(404).send({ message: 'Crush não encontrado' }));
});

// requirement 3
app.post('/login', emailValidator, passwordValidator, (req, res) => {
  const token = generateToken();
  res.status(200).send(token);
});

// requirement 4
app.post('/crush',
  validToken,
  validateAge,
  validateName,
  validateDateEmpty,
  validateDateAtRateEmpty,
  validateDateValues,
  (req, res) => {
    const { age: newAge, date: newDate, name: newName } = req.body;
    readFilesPromise(PATH)
      .then((crushData) => {
        const newId = crushData.length + 1;
        const newCrush = { id: newId, name: newName, age: newAge, date: newDate };
        crushData.push(newCrush);
        const newCrushData = JSON.stringify(crushData);
        fs.writeFile(PATH, newCrushData, (err) => {
          if (err) res.status(404).send({ message: 'Crush não adicionado' });
        });
        res.status(201).send(newCrush);
      })
      .catch(() => res.status(200).send());
});

// requirement 5
app.put('/crush/:id',
  validToken,
  validateAge,
  validateName,
  validateDateEmpty,
  validateDateAtRateEmpty,
  validateDateValues,
  (req, res) => {
    const { age: newAge, date: newDate, name: newName } = req.body;
    const { id } = req.params;
    readFilesPromise(PATH)
      .then((crushData) => {
        const currentId = parseInt(id, 10);
        const newCrush = { id: currentId, name: newName, age: newAge, date: newDate };
        const newCrushDataJson = crushData.filter(({ id: idCrush }) => idCrush !== currentId);
        newCrushDataJson.push(newCrush);
        const newCrushData = JSON.stringify(newCrushDataJson);
        fs.writeFile(PATH, newCrushData, (err) => {
          if (err) res.status(404).send({ message: 'Crush não adicionado' });
        });
        res.status(200).send(newCrush);
      })
      .catch(() => res.status(200).send());
});

app.listen(PORT, () => { console.log('Online'); });
