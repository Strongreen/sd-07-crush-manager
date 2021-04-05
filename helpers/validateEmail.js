module.exports = (email) => {
  const emailPattern = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
  return emailPattern.test(email);
};
