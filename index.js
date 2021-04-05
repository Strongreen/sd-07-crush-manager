const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const crushs = fs.readFileSync('./crush.json', 'utf-8');
  if (crushs.length === 0) {
    console.log(crushs);
    res.status(200).send([]);
  }
  console.log(crushs);
  res.status(200).send(crushs);
});

app.listen(PORT, () => {
  console.log('Online');
});
