const express = require('express');

const controllers = require('./src/controllers');
const middlewares = require('./src/middlewares');
const routes = require('./src/routes');

const app = express();

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());
app.use(middlewares.logMiddleware);
app.use(controllers.login);
app.use(routes.createCrush);
app.use(routes.getAllCrush);
app.use(routes.getCrushId);
app.use(routes.editCrush);
app.use(routes.deleteCrush);

const errorMiddleware = (err, req, res, next) => {
  console.log('Console do middleware no index', err);
  res.status(err.status).send({
  message: err.message,
  });
  next();
  };

  app.use(errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });
