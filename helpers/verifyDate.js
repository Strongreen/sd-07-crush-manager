const { createErrorMessage, createSuccessMessage } = require('./messages');

module.exports = (date) => {
  const correctDate = /([0-9]||[0-9]{2})\/([0-9]||[0-9]{2})\/[0-9]{4}/;

  const validDate = correctDate.test(date);

  if (!validDate) {
    return createErrorMessage(400, 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }

  return createSuccessMessage();
};