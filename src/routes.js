const { Router } = require('express');
const crushController = require('./controllers/crushController');

const routes = Router();

routes.get('/crush', crushController.index);
routes.get('/crush/:id', crushController.idIndex);
routes.post('/login', crushController.login);

module.exports = routes;