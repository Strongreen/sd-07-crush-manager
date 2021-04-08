function notDoneEmail(value) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  if (!value) {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }
  if (regexEmail.test(value) === false) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
}

function notDonePassword(value) {
  if (!value) {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }
  const passwordLenght = value.toString();
  if (passwordLenght.length < 6) {
    return {
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    };
  }
}

function validateEmailPassword(value) {
  const { email, password } = value;
  const objReturnEmail = notDoneEmail(email);
  const objReturnPassword = notDonePassword(password);
  if (objReturnEmail) {
    return objReturnEmail;
  }
  if (objReturnPassword) {
    return objReturnPassword;
  }
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
  let token = '';

  for (let i = 0; i < 16; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}
module.exports = validateEmailPassword;
