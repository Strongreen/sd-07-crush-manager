function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
}

const emailValidate = (email) => {
  const emailValid = validateEmail(email);

  if (email === '' || email === undefined) {
    throw new Error('O campo "email" é obrigatório');
}
  if (!emailValid) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
  return true;
};

module.exports = emailValidate;