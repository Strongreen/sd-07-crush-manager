const crypto = require('crypto');

function crushLoginFunction(request, response) {
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(200).send({ token });
}

module.exports = { crushLoginFunction };