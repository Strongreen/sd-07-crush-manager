const CryptoJS = require('crypto-js');

function getToken(email = '') {
  if (!email.trim()) throw new Error('O email está em branco.');
  const ciphertext = CryptoJS.AES.encrypt(email, '1').toString();
  const removeLength = ciphertext.length - 16;
  const token = ciphertext.slice(removeLength);
  return token;
}

module.exports = getToken;
