const validarEmail = (email) => {
  const parseEmail = /\S+@\S+\.\S+/;
  if (email === '' || email === undefined) {
    throw new Error('O campo "email" é obrigatório');
  } else if (parseEmail.test(email) === false) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
  return true;
};

module.exports = validarEmail;