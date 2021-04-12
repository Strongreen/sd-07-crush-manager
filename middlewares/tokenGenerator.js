// random password generator: https://www.codespeedy.com/how-to-generate-a-random-password-in-javascript/
const tokenGenerator = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const randomToken = Array(16)
    .fill(chars)
    .map((x) => x[Math.floor(Math.random() * x.length)])
    .join('');
  return randomToken;
};

module.exports = tokenGenerator;
