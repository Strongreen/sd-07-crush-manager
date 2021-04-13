function validName(name) {
  const minimumLength = 3;
  if (name.length >= minimumLength) return true;
}

const nameValidate = (name) => {
  if (name === '' || name === undefined) {
    throw new Error('O campo "name" é obrigatório');
  }
  if (!validName(name)) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
  return true;
};

module.exports = nameValidate;