const express = require('express');
const fs = require('fs');

const app = express();
const source = './crush.json';
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const data = JSON.parse(fs.readFileSync(source, 'utf8'));
  res.status(SUCCESS).send(data);
});

app.listen(PORT, () => { console.log('Online'); });
