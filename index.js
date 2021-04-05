const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const NOT_FIND = 404;
const ERROR = 500;
const PORT = 3000;

app.use(express.json());

const crush = './crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

async function returnData() {
  const data = await fs.promises.readFile(crush, 'utf-8');
  return JSON.parse(data);
}

app.get('/crush', async (_req, res) => {
  try {
    const data = await returnData();
    
    return res.status(SUCCESS).json(data);
  } catch (err) {
    console.error(err);
  }
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await returnData();
    const getCrushById = data.filter((crush) => crush.id === Number(id));
    if (getCrushById.length < 1)
      return res.status(NOT_FIND).json({ message: 'Crush não encontrado' });

    return res.status(SUCCESS).json(getCrushById[0]);
  } catch (err) {
    console.log(err)
  }
});

app.post('/login', (req, res) => {
  
});

app.listen(PORT, () => { console.log('Online'); });
