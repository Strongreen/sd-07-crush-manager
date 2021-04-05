const isEmail = (text) => {
  const emailRule = new RegExp('@');
  
  if (emailRule.test(text)) {  
    return true;
  } 

  return false;
};

const isEmpty = (text) => {
  if (text === '') {  
    return true;
  }  

  return false;
};

const validateEmail = (email) => {
  if (isEmpty(email)) {
    return {
      status: 400,
      message: 'O campo "email" é obrigatório',
    };
  }

  if (!isEmail(email)) {
    return {
      status: 400,
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }

  return {
    status: 200,
  };
};

const validatePassword = (password) => {
  if (isEmpty(password)) {
    return {
      status: 400,
      message: 'O campo "password" é obrigatório',
    };
  }

  if (password.length < 6) {
    return {
      status: 400,
      message: 'O "password" ter pelo menos 6 caracteres',
    };
  }

  return {
    status: 200,
  };
};

const newLogin = (email, password) => {
  const statusEmail = validateEmail(email);
  const statusPassword = validatePassword(password);

  if (statusEmail.status === 400) {
    return statusEmail;
  }

  if (statusPassword.status === 400) {
    return statusPassword;
  }  
};

module.exports = {
  newLogin,
};
