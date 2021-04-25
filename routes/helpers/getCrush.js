const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const idGenerator = (data) => {
  if (data) return data.length + 1;
};

const nameValidator = (name, RES) => {
  if (!name || name === '') {
    return RES.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return RES.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const ageValidator = (age, RES) => {
  if (!age || age === '') {
    return RES.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return RES.status(BAD_REQUEST).json({ message: 'O crush deve ser maior de idade' });
  }
};

const dateValidator = (date, RES) => {
  if (!date) {
    return RES.status(BAD_REQUEST).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
};

const datedAtValidator = (date, RES) => {
  const expectedPattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!date.datedAt || date.datedAt === '') {
    return RES.status(BAD_REQUEST).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  
  if (!expectedPattern.test(date.datedAt)) {
    return RES.status(BAD_REQUEST).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa',
    });
  }
};

const rateValidator = (date, RES) => {
  if (date.rate === undefined) {
    return RES.status(BAD_REQUEST).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.rate < 1 || date.rate > 5) {
    return RES.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const newCrush = async (REQ, RES) => {
  const { name, age, date } = REQ.body;
  nameValidator(name, RES);
  ageValidator(age, RES);
  dateValidator(date, RES);
  datedAtValidator(date, RES);
  rateValidator(date, RES);
};

const authCrush = async (REQ, RES) => {
  const { authorization } = REQ.headers;

  if (!authorization) {
    return RES.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (authorization < 15) {
    return RES.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
};

module.exports = {
  newCrush,
  idGenerator,
  authCrush,
};
