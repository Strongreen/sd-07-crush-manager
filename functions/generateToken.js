const generateToken = (length) => {
  const uncappedStr = Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15);
  const token = uncappedStr.substring(0, length);
  return token;
};

module.exports = generateToken;
