const tokenValidate = (token) => {
  if (token === '' || token === undefined) return { message: 'Token não encontrado' };
  if (token.length !== 16) return { message: 'Token inválido' };
};

module.exports = tokenValidate;
