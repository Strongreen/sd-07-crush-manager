const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();
const SUCCESS = 200;
const DEFAULT_PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());
app.use(middlewares.logMiddleware);
app.use('/crush', routes.getAllCrushesRoute);
app.use('/crush/search', routes.searchCrushRoute);
app.use('/crush', routes.getCrushByIdRoute);
app.use('/login', routes.loginRoute);
app.use('/crush', routes.deleteCrushRoute);
app.use('/crush', routes.createCrushRoute);
app.use('/crush', routes.editCrushRoute);

app.use(middlewares.errorMiddleware);

app.listen(DEFAULT_PORT, () => {
  console.log(`Crush Manager App is running on port ${DEFAULT_PORT}`);
});
