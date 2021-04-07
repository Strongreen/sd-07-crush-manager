const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const CRUSHID = '/crush/:id';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readCrushFile = async () => {  
  try {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
  } catch (error) {
    return error;
  } 
};

const writeCrushFile = async (data) => {    
  try {  
    await fs.writeFile(path.resolve(__dirname, '.', 'crush.json'), JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

const validateEmail = (email) => {
  const regexToValidateEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (!email || email === '') return { message: 'O campo "email" é obrigatório' };
  const validEmail = regexToValidateEmail.test(String(email).toLowerCase());  
  if (!validEmail) return { message: 'O "email" deve ter o formato "email@email.com"' };
};

const validatePassword = (password) => {
  if (!password || password.length === 0) return { message: 'O campo "password" é obrigatório' };
  if (password.length < 6) return { message: 'A "senha" deve ter pelo menos 6 caracteres' };
};

const validateName = (name) => {
  if (!name || name.length === 0) return { message: 'O campo "name" é obrigatório' };
  if (name.length < 3) return { message: 'O "name" deve ter pelo menos 3 caracteres' };
};

const validateAge = (age) => {
  if (!age) return { message: 'O campo "age" é obrigatório' };
  if (age < 18) return { message: 'O crush deve ser maior de idade' };
};

const validadeDateCampus = (date) => {
  const { datedAt, rate } = date;
  const regexToValidateDateAt = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  const validDateAt = regexToValidateDateAt.test(datedAt); 
  if (Number(rate) < 1 || Number(rate) > 5) {
return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  } 
  if (!validDateAt) return { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };  
};

const validateDate = (date) => {
if (date === undefined || date.datedAt === undefined || date.rate === undefined) {
    return { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' };
  } 
  return validadeDateCampus(date);
};

const validateCrushData = (name, age, date) => { 
  const isNotNameValid = validateName(name);
  if (isNotNameValid) return isNotNameValid;
  const isNotAgeValid = validateAge(age);
  if (isNotAgeValid) return isNotAgeValid;
  const isNotDateValid = validateDate(date);
  if (isNotDateValid) return isNotDateValid;
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token.length === 0) {
      return res.status(401).send({ message: 'Token não encontrado' });
  }
  
  if (token.length !== 16) return res.status(401).send({ message: 'Token inválido' });
  next();
};

// requisito 7
app.get('/crush/search', validateToken, async (req, res) => {
  const searchTerm = req.query.q;
  const crushes = await readCrushFile();   

  if (!searchTerm) res.status(SUCCESS).send(crushes);

  const crushFound = crushes.filter((crush) => crush.name.includes(searchTerm));
  res.status(SUCCESS).send(crushFound);
});

// requisito 1
app.get('/crush', async (req, res) => {
  const crushes = await readCrushFile();
  res.status(SUCCESS).send(crushes);  
});

// requisito 2
app.get(CRUSHID, async (req, res) => {
  const crushes = await readCrushFile();
  const { id } = req.params;
  const filteredCrush = crushes.find((crush) => crush.id === Number(id));
  if (!filteredCrush) return res.status(404).send({ message: 'Crush não encontrado' });  
  res.status(SUCCESS).send(filteredCrush);  
});

// requisito 3
app.post('/login', (req, res, next) => {
const { email, password } = req.body;
const isEmailValid = validateEmail(email);
const isPasswordValid = validatePassword(password);
if (isEmailValid) return res.status(400).send(isEmailValid);
if (isPasswordValid) return res.status(400).send(isPasswordValid);

// source: https://www.w3schools.com/nodejs/ref_crypto.asp
const token = crypto.randomBytes(8).toString('hex');
req.body = { token };
res.status(SUCCESS).send(req.body);
next();
});

// requisito 4
app.post('/crush', validateToken, async (req, res) => {
  const { name, age, date } = req.body;

  const checkedData = validateCrushData(name, age, date);
  if (checkedData) return res.status(400).send(checkedData);

  const crushes = await readCrushFile();
  const id = crushes.length + 1;
  const newCrush = { id, ...req.body };
  const newCrushes = [...crushes, newCrush];
  await writeCrushFile(newCrushes);  

  res.status(201).send(newCrush);
});

// requisito 5
app.put(CRUSHID, validateToken, async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  
  const checkedData = validateCrushData(name, age, date);
  if (checkedData) return res.status(400).send(checkedData);
  
  const crushes = await readCrushFile();  
  const crushToEdit = { id: Number(id), ...req.body };
  crushes[id] = crushToEdit;
  await writeCrushFile(crushes);

  res.status(SUCCESS).send(crushToEdit);
});

//  requisito 6
app.delete(CRUSHID, validateToken, async (req, res) => {
  const { id } = req.params;
  const crushes = await readCrushFile();  

  const newCrushes = crushes.filter((crush) => crush.id !== Number(id));
  await writeCrushFile(newCrushes);

  res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
});

app.listen(PORT, () => { console.log('Online'); });
