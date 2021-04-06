const isEmail = (text) => {
  const emailRule = new RegExp('@');
  
  if (emailRule.test(text)) {  
    return true;
  } 

  return false;
};

const isEmpty = (text) => {
  if ((text === '') || (text === undefined)) {  
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

const loginMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const statusEmail = validateEmail(email);
  const statusPassword = validatePassword(password);

  if (statusEmail.status === 400) {
    return res.status(statusEmail.status).json({ message: statusEmail.message });  
  }

  if (statusPassword.status === 400) {
    return res.status(statusPassword.status).json({ message: statusPassword.message });  
  }  

  next();
};

module.exports = loginMiddleware;
