const express = require('express');
const bodyParser = require('body-parser');
const crush = require('./routes/crush');
const login = require('./routes/login');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(login);
app.use(crush);

app.listen(PORT, () => { console.log(`Listening on Port: ${PORT}`); });
