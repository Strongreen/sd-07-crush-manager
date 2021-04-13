const express = require('express');
const middlewares = require('../middlewares/index');

const route = express.Router();

const useMiddleware = () => {
    route.use(middlewares.validDateFieldMiddleware);
    route.use(middlewares.testNameFieldMiddleware);
    route.use(middlewares.tokenCheckMiddleware);
    route.use(middlewares.tolkenTestFormat);
    route.use(middlewares.validAgeField);
    route.use(middlewares.validDataMiddleware);
    return route;
};

module.exports = useMiddleware;
