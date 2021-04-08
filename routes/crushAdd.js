const validToken = require('../valid/validToken');

const { validTokenFunction } = validToken;

function crushAddFunction(request, response) {
  const { authorization } = request.headers;
  console.log(authorization);
  validTokenFunction(authorization, response);
  console.log('oioioi');
}

module.exports = { crushAddFunction };