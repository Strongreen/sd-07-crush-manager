const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const NO_TOKEN = 'Token não encontrado';
const INVALID_TOKEN = 'Token inválido';
const pathCrushId = '/crush/:id';

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush/search', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: NO_TOKEN });
  }

  if (authHeader.length !== 16) {
    return res.status(401).json({ message: INVALID_TOKEN });
  }

  const { q } = req.query;

  const file = await readCrushFile();
  if (!q) {
    return res.status(200).json(file);
  }

  const results = file.filter((crush) => crush.name.includes(q));
  return res.status(200).json(results);
});

app.delete(pathCrushId, async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: NO_TOKEN });
  }

  if (authHeader.length !== 16) {
    return res.status(401).json({ message: INVALID_TOKEN });
  }

  const { id } = req.params;
  const file = await readCrushFile();

  if (authHeader.length === 16) {
    const indexId = parseFloat(id);
    file.splice(indexId, 1);
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  }
});

app.listen(3000, () => console.log('listening on port 3000'));
