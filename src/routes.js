const { Router } = require('express');
const tokenValidation = require('./middlewares/tokenValidation');
const crushController = require('./controllers/crushController');
const searchCrushController = require('./controllers/searchCrushController');
const sessionController = require('./controllers/sessionController');

const routes = Router();

routes.get('/crush', crushController.index);
routes.get('/crush/:id', searchCrushController.searchById);
routes.post('/login', sessionController.create);
// routes.use(tokenValidation);
routes.post('/crush', crushController.store);

module.exports = routes;
