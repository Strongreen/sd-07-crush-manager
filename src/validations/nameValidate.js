const nameValidate = (name) => {
  if (name === '' || name === undefined) return { message: 'O campo "name" é obrigatório' };
  if (name.length > 3) return { message: 'O "name" ter pelo menos 3 caracteres' };
  return false;
};

module.exports = nameValidate;
