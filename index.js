const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const crushFile = './crush.json';

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const crushes = JSON.parse(fs.readFileSync(crushFile));
  if (!crushes.length) res.status(200).send([]);
  res.status(200).send(crushes);
});

app.listen(PORT, () => { console.log('Online'); });
