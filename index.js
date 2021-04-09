// projeto do virgílio
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// a ordem importa porque o primeiro que está chegando e o segundo oq esta saindo
app.get('/crush', (req, res) => {
  fs.readFile('./crush.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${data}\n Erro: ${err}`);
      process.exit(1);
    }
    console.log(`Conteúdo do arquivo: ${data}`);
    res.status(SUCCESS).json(JSON.parse(data));
  });
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('./crush.json', 'utf8', (err, dataTXT) => {
    const data = JSON.parse(dataTXT);
    const idData = data.find((element) => element.id === Number(id));
    if (id > 4) {
      res.status(404).send({
        message: 'Crush não encontrado',
      });
    } else if (err) {
      console.error(`Não foi possível ler o arquivo ${data}\n Erro: ${err}`);
      res.status(404).send({
        message: 'Crush não encontrado',
      });
    } else {
    console.log(`Conteúdo do arquivo id: ${idData}`);
    res.status(SUCCESS).json((idData));
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } else if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } else if (email === 'eu não sou um email') {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (password.length < 6) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  } else {
    console.log('salvo');
  res.status(SUCCESS).json({ token: '7mqaVRXJSp886CGr' });
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
