const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');

const routes = require('./routes');
const { SUCCESS } = require('./statusCode.json');

const app = express();
app.use(express.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', routes.getAllCrushes);
app.use('/crush/search', routes.searchCrush);
app.use('/crush', routes.getCrushById);
app.use('/login', routes.login);
app.use('/crush', routes.deleteCrush);
app.use('/crush', routes.createCrush);
app.use('/crush', routes.editCrush);

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });
