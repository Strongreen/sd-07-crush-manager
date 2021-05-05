const passwordField = (password) => {
  if (!password) {
    return {
      error: true,
      message: 'O campo "password" é obrigatório',
    };
  }
  if (String(password).length < 6) {
    return {
      error: true,
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    };
  }
  return { error: false };
};

module.exports = passwordField;