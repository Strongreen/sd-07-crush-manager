const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./Crush');
// const errorMiddleware = require('./errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const crushMiddleware = require('./middlewares/crushMiddleware');
const loginMiddleware = require('./middlewares/loginMiddleware');

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

app.post('/login', loginMiddleware, (_req, res) => 
res.json({ token: '1234567812345678' }));

app.post('/crush', authMiddleware, crushMiddleware.create, (req, res) => {
  const infoCrush = req.body;

  const result = crush.createCrush(infoCrush);  

  return res.status(201).json(result);
});

// app.put('/crush/:id', authMiddleware, crushMiddleware.create, (req, res) => {
//   const infoCrush = req.body;
//   const { id } = req.params;

//   const result = crush.alterCrush(infoCrush, id);  

//   return res.status(201).json(result);
// });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
