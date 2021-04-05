const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const middleWares = require('./middlewares');

app.use(bodyParser.json());

const SUCCESS = 200;
const FAIL = 404;
const PORT = '3000';

async function readFile() {
  const crushs = await JSON.parse(fs.readFileSync('crush.json', 'utf-8'));
  return crushs;
};

// Referência: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
function generate_token(length) {
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  const convertPassword = password.toString();
  if (convertPassword.length >= 6) {
    return true;
  } else {
    return false;
  }
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});


app.get('/crush', async (_req, res) => {
  const data = await readFile();
  res.status(SUCCESS).send(data);
});


app.get('/crush/:id', async (req, res) => {
  const id = req.params.id;
  const crushs = await readFile();
  const dataById = crushs.find(crush => crush.id === parseInt(id));
  if (dataById) {
    return res.status(SUCCESS).send(dataById);
  } else {
    return res.status(FAIL).send({ "message": "Crush não encontrado" })
  }
});

app.post('/login', (req, res) => {

  const reqBody = {
    email: req.body.email,
    password: req.body.password,
  }

  const isValidEmail = validateEmail(reqBody.email);
  const isValidPassword = validatePassword(reqBody.password);

  console.log(reqBody.password);
  
  if (!reqBody.password || reqBody.password === "") {
    return res.status(400).send({ "message": "O campo \"password\" é obrigatório" });
  } else if (!isValidPassword) {
    return res.status(400).send({ "message": "O \"password\" deve ter pelo menos 6 caracteres" });
  };

  if (!reqBody.email || reqBody.email === "") {
    return res.status(400).send({ "message": "O campo \"email\" é obrigatório" });
  } else if (!isValidEmail) {
    return res.status(400).send({ "message": "O \"email\" deve ter o formato \"email@email.com\"" });
  };


  res.status(SUCCESS).send({ "token": generate_token(16) })

});

app.listen(PORT, () => { console.log('Online'); });
