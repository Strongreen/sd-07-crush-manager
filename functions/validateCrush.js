const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateDate = require('./validateDate');

module.exports = (crush, token, res) => {
  const { name, age, date } = crush;
  return !validateToken(token, res)
  && !validateName(name, res)
  && !validateAge(Number(age), res)
  && !validateDate(date, res);
};
