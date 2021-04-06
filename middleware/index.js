const errorMiddleware = require('./errorMiddleware');
const pageNotFoundMiddleware = require('./pageNotFoundMIddleware');
const emailMiddleware = require('./emailMiddleware');
const passwordMiddleware = require('./passwordMiddleware');
const tokenMiddleware = require('./tokenMiddleware');
const nameMiddleware = require('./nameMiddleware');
const ageMiddleware = require('./ageMiddleware');
const dateAttributeMiddleware = require('./dateAttributeMiddleware');
const dateObjectMiddleware = require('./dateObjectMiddleware');
const dateMiddleware = require('./dateMiddleware');

module.exports = { 
    errorMiddleware,
    pageNotFoundMiddleware,
    emailMiddleware,
    passwordMiddleware,
    tokenMiddleware,
    nameMiddleware,
    ageMiddleware,
    dateAttributeMiddleware,
    dateObjectMiddleware,
    dateMiddleware,
};
