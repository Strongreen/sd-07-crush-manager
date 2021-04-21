const { createErrorMessage, createSuccessMessage } = require('../helpers/messages');
const verifyDate = require('../helpers/verifyDate');
const {
  MUST_BE_INTEGER,
  CANNOT_BE_EMPTY,
  NAME_CANNOT_BE_EMPTY,
  AGE_CANNOT_BE_EMPTY,
  NAME_MINIMUM_LENGTH,
  CRUSH_AGE,
  RATE_MUST_BE_INTEGER,
} = require('../helpers/errorMessages');

const validInteger = (date) => {
  if (date.rate < 1 || date.rate > 5) {
    return createErrorMessage(400, RATE_MUST_BE_INTEGER);
  }
  if (!Number.isInteger(date.rate)) {
    return createErrorMessage(400, RATE_MUST_BE_INTEGER);
  }

  return createSuccessMessage();
};

const validNotEmpty = (date) => {
  if (!date || !date.datedAt || !date.rate) return createErrorMessage(400, CANNOT_BE_EMPTY);

  return createSuccessMessage();
};

const validDate = (date) => {
  if (date && date.rate === 0) return createErrorMessage(400, MUST_BE_INTEGER);

  const isNotEmpty = validNotEmpty(date);

  if (isNotEmpty.status === 'error') return isNotEmpty;

  const isInteger = validInteger(date);

  if (isInteger.status === 'error') return isInteger;

  return createSuccessMessage();
};

const validAge = (age) => {
  if (!age) return createErrorMessage(400, AGE_CANNOT_BE_EMPTY);
  if (age < 18) return createErrorMessage(400, CRUSH_AGE);

  return createSuccessMessage();
};

const validName = (name) => {
  if (!name) return createErrorMessage(400, NAME_CANNOT_BE_EMPTY);
  if (name.length < 3) return createErrorMessage(400, NAME_MINIMUM_LENGTH);

  return createSuccessMessage();
};

module.exports = (req, res, next) => {
  const { name, age, date } = req.body;
  const validDateFormat = validDate(date);
  if (validDateFormat.status === 'error') {
    return res.status(validDateFormat.code).send({ message: validDateFormat.message });
  }
  const validAgeFormat = validAge(age);
  if (validAgeFormat.status === 'error') {
    return res.status(validAgeFormat.code).send({ message: validAgeFormat.message });
  }
  const validNameFormat = validName(name);
  if (validNameFormat.status === 'error') {
    return res.status(validNameFormat.code).send({ message: validNameFormat.message });
  }
  const correctDateFormat = verifyDate(date.datedAt);
  if (correctDateFormat.status === 'error') {
    return res.status(correctDateFormat.code).send({ message: correctDateFormat.message });
  }
  next();
};