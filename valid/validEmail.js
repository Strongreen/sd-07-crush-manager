function validEmailFunction(request, response, next) {
  const { email } = request.body;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  if (!email) {
    return response.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  
  if (!regexEmail.test(email)) {
    return response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
}

module.exports = { validEmailFunction };