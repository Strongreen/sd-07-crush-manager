const emailField = (email) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return {
      error: true,
      message: 'O campo "email" é obrigatório',
    };
  }
  if (!regexEmail.test(email)) {
    return {
      error: true,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
  return { error: false };
};

module.exports = emailField;