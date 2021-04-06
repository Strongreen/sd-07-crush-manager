const regex = /\S+@\S+\.\S+/;

const emailValidate = (email) => regex.test(email);

module.exports = emailValidate;
