const passwordValidator = (password) => {
  if (!password) {
    return ({ statusPass: false, messagePass: { message: 'O campo "password" é obrigatório' } });
  }
  if (password.length < 6) {
    return ({ 
        statusPass: false,
        messagePass: {
          message: 'A "senha" deve ter pelo menos 6 caracteres',
        },
      });
  }
  return ({
    statusPass: true,
    messagePass: {
      message: 'password OK',
    },
  });
};

module.exports = passwordValidator;
