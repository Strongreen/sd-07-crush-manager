const express = require('express');
const bodyParser = require('body-parser');
/* const fs = require('fs');
const crypto = require('crypto'); */

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', require('./routes/crush'));
app.use('/login', require('./routes/login'));

/* const getJSON = () => JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));
app.get('/crush', (_request, response) => {
  const data = getJSON();
  response.status(SUCCESS).json(data);
}); */

/* app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const filter = getJSON().find((crush) => crush.id === Number(id));
  if (filter) {
    response.status(SUCCESS).json(filter);
  } else {
    response.status(404).json({ message: 'Crush não encontrado' });
  }
}); */

/* app.post('/', (req, res) => {
  const { email, password } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const token = crypto.createHash('md5').update(email + password).digest('hex').slice(0, 16);
  return res.status(SUCCESS).json({ token });
}); */

app.listen(PORT, () => { console.log('Online'); });
