const LENGTHMIN = 6;

const passwordValidate = (password) => password.length >= LENGTHMIN;

module.exports = passwordValidate;
