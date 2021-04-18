const { Router } = require('express');
const LoginController = require('../controller/LoginController');

const LoginRoute = Router();

LoginRoute
    .post('/', LoginController.addLogin);

module.exports = LoginRoute;
