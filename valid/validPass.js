function validPassFunction(request, response, next) {
  const { password } = request.body;
  let passwordString = '';
  if (password) { passwordString = password.toString(); }
  if (!password) {
    return response.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  
  if (passwordString.length < 6) {
    response.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  next();
}

module.exports = { validPassFunction };
