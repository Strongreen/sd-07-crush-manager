const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const fs = require('fs');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const crushList = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  if (crushList.length > 0) {
    return res.status(200).json(crushList);
  }
  if (crushList.lenght === 0) {
    return res.status(200).json([]);
  }
});

app.get('/crush/:idtofind', (req, res) => {
  console.log('entrou no :id');

  const { idtofind } = req.params;

  const crushList = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  const crushIndex = crushList.findIndex(({ id }) => id === idtofind);
  if (crushIndex === -1) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.send(crushList[crushIndex]);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const regexValidation = regex.test(email);

  if (!password) {
    res.status(400).send({
      "message": "O campo \"password\" é obrigatório"
    })
  }
  if (password.length < 6) {
    res.status(400).send({
      "message": "O \"password\" ter pelo menos 6 caracteres"
    })
  }
  if (!email) {
    res.status(400).send({
      "message": "O campo \"email\" é obrigatório"
    })
  }
  if (!regexValidation) {
    res.status(400).send({
      "message": "O \"email\" deve ter o formato \"email@email.com\""
    })
  }
  // res.send("chegou ao final")

  const generatedToken = crypto.randomBytes(8).toString("hex");;
  res.send({
    "token": generatedToken
  })
})

app.listen(PORT, () => { console.log('Online'); });
