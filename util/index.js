const generateToken = require('./generateToken');
const validationEmail = require('./validationEmail');
const validationPassword = require('./validationPassword');
const createFunction = require('./createFunction');
const updateFunction = require('./updateFunction');
const sortFunction = require('./sortFunction');
const deleteFunction = require('./deleteFunction');
const searchFunction = require('./searchFunction');

module.exports = {
    generateToken,
    validationEmail,
    validationPassword,
    createFunction,
    updateFunction,
    sortFunction,
    deleteFunction,
    searchFunction,
};
