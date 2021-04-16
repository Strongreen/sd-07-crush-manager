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
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  if (data.length > 0) {
    res.status(200).send(data);
  } else {
    res.status(200).send([]);
  }
});

app.listen(PORT, () => { console.log('Online'); });
