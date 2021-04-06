const express = require('express');
const bodyParser = require('body-parser');
const { 
  readFile,
  deleteCrush,
  editCrush,
  setCrush,
  validateRate,
  validateDate,
  validateAge,
  validateName,
  login,
  searchCrush,
  validateUser,
} = require('./middlewares');

const app = express();

app.use(bodyParser.json());

const SUCCESS = 200;
const FAIL = 404;
const PORT = '3000';
const BASEPATH = '/crush';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get(`${BASEPATH}/search`, validateUser, searchCrush);

app.get(`${BASEPATH}`, async (_req, res) => {
  const data = await readFile();
  res.status(SUCCESS).send(data);
});

app.get(`${BASEPATH}/:id`, async (req, res) => {
  const { id } = req.params;
  const crushs = await readFile();
  const dataById = crushs.find((crush) => crush.id === Number(id));
  if (dataById) {
    return res.status(SUCCESS).send(dataById);
  }
  return res.status(FAIL).send({ message: 'Crush não encontrado' });
});

app.post('/login', login);

app.post('/crush',
  validateUser,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  setCrush);

app.put('/crush/:id',
  validateUser,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  editCrush);

app.delete('/crush/:id', validateUser, deleteCrush);

app.listen(PORT, () => { console.log('Online'); });
