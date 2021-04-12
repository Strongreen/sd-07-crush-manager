const express = require('express');
const middlewares = require('../middlewares/index');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const route = express.Router();

const useMiddleware = () => {
    route.use(middlewares.validDateFieldMiddleware);
    route.use(middlewares.testNameFieldMiddleware);
    route.use(middlewares.tokenCheckMiddleware);
    route.use(middlewares.tolkenTestFormat);
    route.use(middlewares.validAgeField);
    route.use(middlewares.validDataMiddleware);
};

module.exports = useMiddleware;
