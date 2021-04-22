const tokenValidate = (token) => {
  if (token === '' || token === undefined) throw new Error('2 Token não encontrado');
  if (token.length !== 16) throw new Error('Token inválido');
  return false;
};

module.exports = tokenValidate;
