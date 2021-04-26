const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const idGenerator = (data) => {
  if (data) return data.length + 1;
};

const nameValidator = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidator = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age && age < 18) {
    return res.status(BAD_REQUEST).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const datedAtValidator = (req, res, next) => {
  const { date } = req.body;
  const expectedPattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!date || !date.datedAt) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }

  if (!expectedPattern.test(date.datedAt)) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const rateValidator = (req, res, next) => {
  const { date } = req.body;
  if (!date || date.rate === undefined) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const authCrush = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  idGenerator,
  nameValidator,
  ageValidator,
  datedAtValidator,
  rateValidator,
  authCrush,
};
