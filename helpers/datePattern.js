const { createErrorMessage, createSuccessMessage } = require('./createMessage');
const { WRONG_DATE_FORMAT } = require('./errorMessages');

module.exports = (date) => {
  const datePattern = /([0-9]||[0-9]{2})\/([0-9]||[0-9]{2})\/[0-9]{4}/;

  const isDateValid = datePattern.test(date);

  if (!isDateValid) return createErrorMessage(400, WRONG_DATE_FORMAT);

  return createSuccessMessage();
};
