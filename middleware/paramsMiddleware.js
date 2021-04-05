const { createErrorMessage, createSuccessMessage } = require('../helpers/createMessage');
const datePattern = require('../helpers/datePattern');
const {
  MUST_BE_INTEGER,
  CANNOT_BE_EMPTY,
  NAME_CANNOT_BE_EMPTY,
  AGE_CANNOT_BE_EMPTY,
  NAME_MINIMUM_LENGTH,
  CRUSH_AGE,
  RATE_MUST_BE_INTEGER,
} = require('../helpers/errorMessages');

const validateInteger = (date) => {
  if (date.rate < 1 || date.rate > 5) return createErrorMessage(400, RATE_MUST_BE_INTEGER);
  if (!Number.isInteger(date.rate)) return createErrorMessage(400, RATE_MUST_BE_INTEGER);

  return createSuccessMessage();
};

const validateNotEmpty = (date) => {
  if (!date || !date.datedAt || !date.rate) return createErrorMessage(400, CANNOT_BE_EMPTY);

  return createSuccessMessage();
};

const validateDate = (date) => {
  if (date && date.rate === 0) return createErrorMessage(400, MUST_BE_INTEGER);

  const isNotEmpty = validateNotEmpty(date);

  if (isNotEmpty.status === 'error') return isNotEmpty;

  const isInteger = validateInteger(date);

  if (isInteger.status === 'error') return isInteger;

  return createSuccessMessage();
};

const validateAge = (age) => {
  if (!age) return createErrorMessage(400, AGE_CANNOT_BE_EMPTY);
  if (age < 18) return createErrorMessage(400, CRUSH_AGE);

  return createSuccessMessage();
};

const validateName = (name) => {
  if (!name) return createErrorMessage(400, NAME_CANNOT_BE_EMPTY);
  if (name.length < 3) return createErrorMessage(400, NAME_MINIMUM_LENGTH);

  return createSuccessMessage();
};

module.exports = (req, res, next) => {
  const { name, age, date } = req.body;
  const isDateValid = validateDate(date);
  if (isDateValid.status === 'error') {
    return res.status(isDateValid.code).send({ message: isDateValid.message });
  }
  const isAgeValid = validateAge(age);
  if (isAgeValid.status === 'error') {
    return res.status(isAgeValid.code).send({ message: isAgeValid.message });
  }
  const isNameValid = validateName(name);
  if (isNameValid.status === 'error') {
    return res.status(isNameValid.code).send({ message: isNameValid.message });
  }
  const dateRightFormat = datePattern(date.datedAt);
  if (dateRightFormat.status === 'error') {
    return res.status(dateRightFormat.code).send({ message: dateRightFormat.message });
  }
  next();
};
