const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { tokenvalid, crushvalid, datavalid } = require('./mid');

const app = express();
app.use(bodyParser.json());
const NF = 404;
const INVALID = 400;
const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
// getAllCrushs
app.get('/crush', (_request, response) => {
  const content = JSON.parse(fs.readFileSync(`${__dirname}/crush.json`));
  response.status(SUCCESS).json([...content]);
});
// getCrushById
app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const obj = { status: NF, response: { message: 'Crush não encontrado' } };
  const content = JSON.parse(fs.readFileSync(`${__dirname}/crush.json`));
  content.forEach((crush) => {
    if (crush.id === Number(id)) {
      obj.status = SUCCESS;
      obj.response = crush;
    }
  });
  response.status(obj.status).json(obj.response);
});
// login
function tokens() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const tamanho = 16;
  for (let index = 0; index < tamanho; index += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const regexPassword = 6;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.com$/;
  if (!email) {
    response.status(INVALID).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    response.status(INVALID).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!regexEmail.test(email)) {
    response.status(INVALID).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.toString().length < regexPassword) {
    response.status(INVALID).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  const token = tokens();
  response.status(SUCCESS).json({ token });
});

app.use(tokenvalid);
app.use(crushvalid);
app.use(datavalid);

app.post('/crush', (req, res) => {
  try {
    const content = JSON.parse(fs.readFileSync(`${__dirname}/crush.json`));
    const newContent = {
      id: content[content.length - 1].id + 1,
      ...req.body,
    };
    fs.writeFileSync(`${__dirname}/crush.json`, JSON.stringify([...content, newContent], null, 2));

    return res.status(201).json(newContent);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(PORT, () => { console.log('Online'); });
