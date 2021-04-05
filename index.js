const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const useToken = { token: '7mqaVRXJSp886CGr' };

const useAuth = (req, res, next) => {
  const { authorizathion } = req.headers;
    if (!authorizathion) {
 return res.status(401).json(
      { message: 'Token não encontrado' },
      ); 
}
    if (authorizathion !== useToken.token) {
 return res.status(401).json(
      { message: 'Token inválido' },
      ); 
}
    next();
};

app.use(useAuth);

const infoValid = (name, age, date) => {
  if(!name) return 'O campo "name" é obrigatório';
  if(name.length < 3) return 'O campo "name" deve ter pelo menos 3 caracteres';
  if(!age) return 'O campo "age" é obrigatório';
  if(age < 18) return 'O "crush" deve ser maior de idade';
  if(!date || !date.datedAt || date.rate === undefined) {
    return 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  }
};

const regexDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if(date && !regexDate.test(date.datedAt)) return 'O campo "datedAt" deve ser no formato "dd/mm/aaaa"';
  if(date.rate < 1 || date.rate > 5) return 'O campo "rate" deve ser inteiro de 1 a 5';
  return 'OK';

  const getCrushes = () => JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  const jsonFile = () => JSON.parse(fs.writeFileSync('./crush.json', 'content'));

  // não remova esse endpoint, e para o avaliador funcionar
  app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
  });

  //req 1
  app.get('/crush', (_req, res) => {
    res.status(SUCCESS).send(getCrushes());
  });

  //req 2
  app.get('/crush/:id', (req, res) => {
    const { id } = req.params;
    const reqCrush = getCrushes().find((crush) => crush.id === +id);
    if(!reqCrush) return res.status(404).json({ message: 'Crush não encontrado'});
    res.status(SUCCESS).json(reqCrush);
  });
  
  //req 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if(!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if(!regexEmail) return res.status(400).json({ message: 'O campo "email" deve ter o formato "email@email.com"' });
  if(!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if(password.length < 6) return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  res.status(SUCCESS).json(useToken);
});

//req 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  infoValid(name, age, date);

  res.status(SUCCESS).json(useToken);
});

//req 4
app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const message = infoValid(name, age, date);
  if(message !== 'OK') return res.status(400).json({ message });
  const allCrushes = getCrushes();
  const freshCrushes = { id: allCrushes.length + 1, ...req.body };
  const freshData = allCrushes.concat(freshCrush);
  await jsonFile(JSON.stringify(freshData));
  res.status(201).json(freshCrush);
});

app.listen(PORT, () => { console.log('Online'); });
