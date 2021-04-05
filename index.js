const express = require('express');
const fs = require('fs');

const validator = require('email-validator');
const randtoken = require('rand-token');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.use(express.json());
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
// --------------------- REQ 1 ---------------------
app.get('/crush', (_request, response) => {
  const data = JSON.parse(fs.readFileSync('./crush.json'));
  if (!data) return response.status(200).json([]);
  response.status(SUCCESS).json(data);
});
// --------------------- REQ 2 ---------------------
app.get('/crush/:id', (request, response) => {
  const data = JSON.parse(fs.readFileSync('./crush.json'));
  const { id } = request.params;
  const result = data.find((item) => item.id === Number(id));
  if (result) return response.status(200).send(result);
  response.status(404).json({ message: 'Crush não encontrado' });
});
// --------------------- REQ 3 ---------------------
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const token = randtoken.generate(16);
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validator.validate(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  response.status(200).json({ token });
});
// --------------------- REQ 4 ---------------------
app.post('/crush', (request, response) => {
  // https://www.codegrepper.com/code-examples/javascript/javascript+validate+date+dd%2Fmm%2Fyyyy
  const { name, age, date, id } = request.body;
  const { authorization } = request.headers;
  const dataFile = JSON.parse(fs.readFileSync('./crush.json'));
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return response.status(401).json({ message: 'Token inválido' });
  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age) return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age) < 18) return response.status(400).json({ message: 'O crush deve ser maior de idade' });
  if (!date || !date.rate || !date.datedAt) return response.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!(dateRegex.test(date.datedAt))) return response.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (Number(date.rate) < 1 || Number(date.rate) > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  dataFile.push({
    id: id || dataFile.length + 1,
    name,
    age,
    date,
  });
  fs.writeFileSync('./crush.json', JSON.stringify(dataFile, null, 2));
  const data = JSON.parse(fs.readFileSync('./crush.json'));
  response.status(201).send(data[data.length - 1]);
});

// --------------------- REQ 5 ---------------------

// --------------------- REQ 6 ---------------------
app.delete('/crush/:id', (request, response) => {
  const { id } = request.params;
  const { authorization } = request.headers;
  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return response.status(401).json({ message: 'Token inválido' });
  const data = JSON.parse(fs.readFileSync('./crush.json'));
  const newData = data.filter((item) => item.id !== Number(id));
  fs.writeFileSync('./crush.json', JSON.stringify(newData, null, 2));
  response.status(200).json({ message: 'Crush deletado com sucesso' });
});
// --------------------- REQ 7 ---------------------

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
