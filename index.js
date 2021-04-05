const express = require('express');
const bodyParser = require('body-parser');
// const crushes = require('./crush.json');
const crushRoutes = require('./routes/crush.js');

const app = express();

app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send('sim');
});

app.use('/crush', crushRoutes);

app.listen(PORT, () => { console.log('Online'); });
