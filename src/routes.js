const { Router } = require('express');
const tokenValidation = require('./middlewares/tokenValidation');
const crushController = require('./controllers/crushController');
const searchCrushController = require('./controllers/searchCrushController');
const sessionController = require('./controllers/sessionController');

const routes = Router();

routes.get('/crush', crushController.index);
routes.get('/crush/search', tokenValidation, crushController.search);
routes.route('/crush/:id')
.get(searchCrushController.searchById)
.put(tokenValidation, crushController.update)
.delete(tokenValidation, crushController.deleteCrush);
routes.post('/login', sessionController.create);
routes.post('/crush', tokenValidation, crushController.store);

module.exports = routes;
