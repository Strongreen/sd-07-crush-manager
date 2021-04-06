const generateToken = (length) => {
  const uncappedStr = Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15);
  // o código acima foi extraído de:
  // https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
  const token = uncappedStr.substring(0, length);
  return token;
};

module.exports = generateToken;
