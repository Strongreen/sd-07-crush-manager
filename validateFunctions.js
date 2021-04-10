const dateMessage = {
  message:
    'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+$/;
  return re.test(email);
};

const validateDate = (receivedDate) => {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return re.test(receivedDate);
};

const tokenAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

const nameAuth = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const ageAuth = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age <= 17) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }

  next();
};

const dateAuth = (req, res, next) => {
  const { date } = req.body;
  if (!date) {
    res.status(400).json(dateMessage);
  }
  if (!date.datedAt) {
    res.status(400).json(dateMessage);
  }
  const dateIsValid = validateDate(date.datedAt);
  if (!dateIsValid) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const dateAuth2 = (req, res, next) => {
  const { date } = req.body;

  if (!date.rate && date.rate !== 0) {
    return res.status(400).json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (date.rate > 5 || date.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const emailAuth = (req, res, next) => {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  const ValidEmail = validateEmail(email);
  if (!ValidEmail) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

module.exports = {
  validateEmail,
  validateDate,
  tokenAuth,
  nameAuth,
  ageAuth,
  dateAuth,
  dateAuth2,
  emailAuth,
};
