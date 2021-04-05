const createErrorMessage = (code, message) => ({ status: 'error', code, message });
const createSuccessMessage = () => ({ status: 'success' });

module.exports = { createErrorMessage, createSuccessMessage };
