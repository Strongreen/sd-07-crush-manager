const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const fileCrushs = './crush.json';

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// 1
app.get('/crush', (req, res) => {
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8');  
  res.status(SUCCESS).send(crushs);
});

// 2
app.get('/crush/:id', (req, res) => {
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8');  
  const { id } = req.params;
  const crushId = crushs.find((element) => element.id === parseInt(id, 10));

  if (crushId === true) {
    res.status(SUCCESS).send(crushId);
  }

  res.status(404).send(
    { message: 'Crush não encontrado' },
  );
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
