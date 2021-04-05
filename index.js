const express = require('express');

const routesCrush = require('./routes/routesCrush');
const routesLogin = require('./routes/routesLogin');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = 3000;

app.use(routesCrush);
app.use(routesLogin);

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
