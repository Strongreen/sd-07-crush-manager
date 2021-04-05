module.exports = {
  validadeEmail(request, response, next) {
    const { email } = request.body;
    if (email === '' || email === undefined) {
      return response.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return response.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
    next();
  },
  validatePassword(request, response, next) {
    const { password } = request.body;
    if (password === '' || password === undefined) {
      return response.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return response.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }
    next();
  },
};
