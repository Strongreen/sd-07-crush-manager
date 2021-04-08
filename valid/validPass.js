function validPassFunction(password, response) {
  let passwordString = '';
  if (password) { passwordString = password.toString(); }
  if (!password) {
    response.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
    throw new Error('O campo "password" é obrigatório');
  }
  
  if (passwordString.length < 6) {
    response.status(400).send({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
}

module.exports = { validPassFunction };
