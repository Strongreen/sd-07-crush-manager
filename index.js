const express = require('express');

const crush = require('./routes/crush');
const middlewares = require('./middlewares');

const app = express();

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
app.use(express.json());

app.post(
  '/login', 
  middlewares.validateEmailMiddleware, 
  middlewares.validatePasswordMiddleware, 
  (req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
},
);

app.use(middlewares.logMiddware);

app.use('/crush', crush);
app.listen(PORT, () => { console.log('Online'); });
