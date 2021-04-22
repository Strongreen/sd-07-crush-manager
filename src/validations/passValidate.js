const passValidate = (password) => {
  if (password === '' || password === undefined) {
    throw new Error('O campo "password" é obrigatório');
  }
  const passString = password.toString();
  if (passString.length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
  return false;
};

module.exports = passValidate;
