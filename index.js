const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

const crushs = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  if (crushs.length === 0) {
    console.log(crushs);
    res.status(200).send([]);
  }
  console.log(crushs);
  res.status(200).send(crushs);
});

app.get('/crush/:id', (req, res) => {
  const { id: reqId } = req.params;
  const crush = crushs.find(({ id }) => id.toString() === reqId);
  if (crush) {
    res.status(200).send(crush);
  }
  return res.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
