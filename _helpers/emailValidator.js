const emailValidator = (email) => {
  if (!email) {
    return ({
      statusEmail: false,
      messageEmail: {
        message: 'O campo "email" é obrigatório',
      },
    });
  }
  const regEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  if (!regEmail.test(email)) {
    return ({
      statusEmail: false,
      messageEmail: {
        message: 'O "email" deve ter o formato "email@email.com"',
      },
    });
  }
  return ({ statusEmail: true, messageEmail: { message: 'email-ok' } });
};

module.exports = emailValidator;
