module.exports = (email) => {
  const correctEmail = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
  return correctEmail.test(email);
};