// regex: https://ihateregex.io/expr/email/
const emailValidation = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
};

module.exports = {
  emailValidation,
};
