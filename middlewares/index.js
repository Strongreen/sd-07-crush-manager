const loginCheckEmail = require('./loginCheckEmail');
const passwordCheck = require('./loginCheckPassword');
const requesToken = require('./requestToken');
const checkToken = require('./checkToken');
const checkAge = require('./checkAge');
const checkDate = require('./checkDate');
const checkName = require('./checkName');
const registerCrush = require('./registerCrush')

module.exports = {
    loginCheckEmail, passwordCheck, requesToken, checkToken, checkAge, checkDate, checkName, registerCrush
};