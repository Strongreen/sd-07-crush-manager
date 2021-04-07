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

// ---------- Função para escrever no arquivo --------
// const fileWriter = async (newUser) => {
//   await fs.writeFile(data, JSON.stringify(newUser)); 
// };

// ----------- Função que valida email ---------------
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  const emailReg = /\S+@\S+\.\S+/;
  return emailReg.test(email);
}

// ----------- Função que valida senha ---------------
function validatePassword(password) {
  const maximumSize = 6;
  if (password.toString().length >= maximumSize) return password;
}

// ------------ Middleware que valida token ---------------
function validateTokenMiddleware(request, response, next) {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
}

// ------------- Middleware que valida name -------------
function validateNameMiddleware(request, response, next) {
  const { name } = request.body;
  const minSize = 3;
  if (!name) {
    return response.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < minSize) {
    return response.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
}

// ------------- Middleware que valida age -------------
function validateAgeMiddleware(request, response, next) {
  const { age } = request.body;
  const minAge = 18;
  if (!age) {
    return response.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < minAge) {
    return response.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  next();
}

// ------------- Middleware que valida date -------------
function validateDateMiddleware(request, response, next) {
  // Regex dd/mm/aaaa: https://www.regextester.com/99555
  const { date } = request.body;
  const dateReg = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!date || !date.rate || !date.datedAt) {
    return response.status(400).json({
    message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!(dateReg.test(date.datedAt))) {
    return response.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

// ------------- Middleware que valida date -------------
function validateRateMiddleware(request, response, next) {
  const { date } = request.body;
  if (date.rate < 1 || date.rate > 5 || date.rate !== parseInt(date.rate, 0)) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
}

// 1 --------- Crie o endpoint GET /crush ---------------
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
  return response.status(404).json({ message: 'Crush não encontrado' });
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
    return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return response.status(SUCCESS).json({ token });
});

// 4 ---------- Crie o endpoint POST /crush ---------------
app.use(validateTokenMiddleware, validateNameMiddleware, 
validateAgeMiddleware, validateDateMiddleware, validateRateMiddleware);
app.post('/crush', async (request, response) => {
  const { name, age, date } = request.body;
  const nextCrush = await fileReader();
  const crush = {
    id: nextCrush.length + 1,
    name,
    age: parseInt(age, 0),
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };
  return response.status(201).json(crush);
});
