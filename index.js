const express = require('express');
const { crushRoutes, loginRoute } = require('./routes');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crushRoutes);
app.use('/login', loginRoute);

app.listen(PORT, () => { console.log('Online'); });
