// solução para gerar token aleatório encontrada em: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
function generateToken(len) {
  const rand = () => Math.random(0).toString(36).substr(2);
  const token = (rand() + rand() + rand() + rand()).substr(0, len);
  return token;
}

function isValidEmail(email) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.match(regex)) return true;
    return false;
}

function isValidPassword(password) {
    if (String(password).length < 6) return false;
    return true;
}

function isValidToken(token) {
  if (token.length !== 16) return false;
  return true;
}

module.exports = {
  generateToken,
  isValidEmail,
  isValidPassword,
  isValidToken,
};
