const emailValidate = require('./emailValidate');
const passwordValidate = require('./passwordValidate');
const authorizationValidate = require('./authorizationValidate');
const nameValidate = require('./nameValidate');
const ageValidate = require('./ageValidate');
const dateValidate = require('./dateValidate');
const datedAtValidate = require('./datedAtValidate');
const rateValidate = require('./rateValidate');

module.exports = {
  emailValidate,
  passwordValidate,
  authorizationValidate,
  nameValidate,
  dateValidate,
  ageValidate,
  datedAtValidate,
  rateValidate,
};