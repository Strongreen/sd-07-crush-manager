const passwordValidate = (password) => {
  if (password === '' || password === undefined) {
    throw new Error('O campo "password" é obrigatório');
}
  if (password.toString().length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
  return true;
};

module.exports = passwordValidate;