const express = require('express');

const app = express();

const crush = require('../routes/crush');
const login = require('../routes/login');

app.use(express.json());
app.use('/crush', crush);
app.use('/login', login);

module.exports = app;