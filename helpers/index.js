const status = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Fonte: https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript
function genRanHex(size) {
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  }
// Fonte: https://www.codegrepper.com/code-examples/javascript/check+mail+with+regex
function validEmail(email) {
  const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validate.test(email);
}

  module.exports = { status, genRanHex, validEmail };