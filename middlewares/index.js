const validationMiddleware = require('./validations');
const errorMiddleware = require('./error');
const tokenCheckMiddleware = require('./tokenSearch');
const tolkenTestFormat = require('./tolkenTestFormat');
const testNameFieldMiddleware = require('./testNameField');
const validAgeField = require('./validAgeField');
const validDataMiddleware = require('./validData');
const validDateFieldMiddleware = require('./validDateField');

module.exports = {
    validDateFieldMiddleware,
    testNameFieldMiddleware,
    validationMiddleware,
    tokenCheckMiddleware,
    validDataMiddleware,
    tolkenTestFormat,
    errorMiddleware,
    validAgeField,
};