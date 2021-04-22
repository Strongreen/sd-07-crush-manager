const passValidate = (password) => {
  if (password === '' || password === undefined) {
    return { message: 'O campo "password" é obrigatório' };
  }
  const passString = password.toString();
  if (passString.length < 6) return { message: 'A "senha" deve ter pelo menos 6 caracteres' };
  return false;
};

module.exports = passValidate;
