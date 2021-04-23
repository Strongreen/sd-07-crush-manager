// source: https://www.tutorialspoint.com/how-to-create-a-password-generator-javascript

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const size = 16;

function getToken() {
  let token = '';
  for (let i = 0; i < size; i += 1) {
    token += chars.charAt(Math.floor(Math.random() * size));
  }

  return token;
}

module.exports = getToken;
