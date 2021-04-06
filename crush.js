const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const crushFile = () => fs.promises.readFile('./crush.json', 'utf8');
// desse jeito porque vai ser chamado várias outras vezes (Plantão Rufino);

app.get('/', async (_req, res) => {
  res.status(200).json(JSON.parse(await crushFile()));
}); // requisito 1

function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
} // referência: conteúdo Promises, dia 26.2

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const isId = await readFilePromise('./crush.json')
    .then((content) => JSON.parse(content).find((item) => item.id.toString() === id))
    .catch((err) => {
    console.error(`Erro ao ler arquivo: ${err.message}`);
  });
  if (!isId) return res.status(404).send({ message: 'Crush não encontrado' });
  
  res.status(200).send(isId);
}); // requisito 2

// function isValidName(name) {
//   let responseBool = false;
//   let response = '';

//   if (!name) {
//     responseBool = true;
//     response = 'O campo "name" é obrigatório';
//   } else if (name.length < 3) {
//     responseBool = true;
//     response = 'O "name" deve ter pelo menos 3 caracteres';
//   } else {
//     responseBool = false;
//   }

//   return [responseBool, response];
// }

// function isValidAge(age) {
//   let responseBool = false;
//   let response = '';

//   if (!age) {
//     responseBool = true;
//     response = 'O campo "age" é obrigatório';
//   } else if (age < 18) {
//     responseBool = true;
//     response = 'O crush deve ser maior de idade';
//   } else {
//     responseBool = false;
//   }

//   return [responseBool, response];
// }

// function isValidDate(date) {
//   let responseBool = false;
//   let response = '';
//   const regex = \d{2}/\d{2}/\d{4};

//   if (!date) {
//     responseBool = true;
//     response = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
//   } else if (!date.rate) {
//     responseBool = true;
//     response = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
//   } else if (!date.datedAt) {
//     responseBool = true;
//     response = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
//   } else if (date.rate >= 1 || date.rate <= 5) {
//     responseBool = true;
//     response = 'O campo "rate" deve ser um inteiro de 1 à 5';
//   } else if (!date.datedAt.match(regex)) {
//     responseBool = true;
//     response = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
//   } else {
//     responseBool = false;
//   }

//   return [responseBool, response];
// }

// app.post('/', (req, res) => {
//   const isName = isValidName(req.body.name);
//   const isAge = isValidAge(req.body.name);
//   const isDate = isValidDate(req.body.date);

//   if (isName[0]) {
//     res.status(400).send({ message: isName[1] });
//   } else if (isAge[0]) {
//     res.status(400).send({ message: isAge[1] });
//   } else if (isDate[0]) {
//     res.status(400).send({ message: isDate[1] });
//   } else {
//     res.status(201).send(req.body);
//   }
// });

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

module.exports = app;
