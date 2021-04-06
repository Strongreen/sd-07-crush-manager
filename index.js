const express = require('express');
// const bodyParser = require('body-parser');
const fs = require('fs').promises;
const randtoken = require('rand-token');

const data = ('./crush.json');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });

// ----------- Função pra ler o arquivo --------------
const fileReader = async () => {
  const file = await fs.readFile(data);
  return JSON.parse(file);
};

// ----------- Função que valida email ---------------
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
}

// ----------- Função que valida senha ---------------
function validatePassword(password) {
  const maximumSize = 6;
  if (password.toString().length >= maximumSize) return password;
}

// 1 ------- Crie o endpoint GET /crush ---------------
app.get('/crush', async (_request, response) => {
  const crushList = await fileReader();
  if (!crushList) {
    return response.status(SUCCESS).send([]);
  }
  return response.status(SUCCESS).send(crushList);
});

// 2 --------- Crie o endpoint GET /crush/:id ---------
app.get('/crush/:id', async (request, response) => {
  const userID = await fileReader();
  const { id } = request.params;
  const user = userID.find((idNumber) => idNumber.id === Number(id));
  if (user) return response.status(SUCCESS).send(user);
  if (id > 4 || id < 1) { return response.status(404).json({ message: 'Crush não encontrado' }); }
});

// 3 ---------- Crie o endpoint POST /login -----------
app.post('/login', (request, response) => {
  // Gerador de token: https://www.npmjs.com/package/rand-token
  const token = randtoken.generate(16);
  const { email, password } = request.body;
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!validatePassword(password)) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return response.status(SUCCESS).json({ token });
});