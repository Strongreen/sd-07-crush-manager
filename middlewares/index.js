const authorizationMid = require('./authorizationMid');
const checkNameMid = require('./nameMid');
const checkAgeMid = require('./ageMid');
const dateMid = require('./dateMid');
const errorMid = require('./errorMid');
const emailMid = require('./emailMid');
const passwordMid = require('./passwordMid');
const requestTokenMid = require('./requestTokenMid');

module.exports = {
  authorizationMid,
  checkNameMid,
  checkAgeMid,
  dateMid,
  errorMid,
  emailMid,
  passwordMid,
  requestTokenMid
};
