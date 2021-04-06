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

app.get('/crush', async (req, res) => {
  const crushs = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
  return res.status(SUCCESS).send(crushs);
});

app.get('/crush/:id', async (req, res) => {
  const { id: reqId } = req.params;
  const crushs = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
  const crush = await crushs.find(({ id }) => id.toString() === reqId);
  if (crush) {
    return res.status(SUCCESS).send(crush);
  }
  return res.status(404).send({
    message: 'Crush não encontrado',
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
