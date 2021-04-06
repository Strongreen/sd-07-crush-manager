const express = require('express');
const { crushRoute, loginRoute } = require('./routes');
const { errorMiddleware } = require('./middleware');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', crushRoute);
app.use('/login', loginRoute);

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });
