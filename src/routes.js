const { Router } = require('express');
const crushController = require('./controllers/crushController');

const routes = Router();

routes.get('/crush', crushController.index);

module.exports = routes;