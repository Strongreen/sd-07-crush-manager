const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./Crush');
const login = require('./Login');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

app.get('/crush', (_req, res) => {
  const crushes = crush.getAllCrushes();

  return res.status(200).json(crushes);
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  
  const infoCrush = crush.getCrush(id);

  if (Object.entries(infoCrush).length === 0) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }

  return res.status(200).json(infoCrush[0]);
});

const middlewareLogin = (req, res, next) => {
  const { email, password } = req.body;

  const result = login.newLogin(email, password);

  if (result.status !== 400) {
    next();
  }

  return res.status(result.status).json({ message: result.message });
};

app.post('/login', middlewareLogin, (req, res) => res.json({ token: '1234567812345678' }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
