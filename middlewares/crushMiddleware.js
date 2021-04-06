const isADate = (date) => {
  if (date === undefined) {
    return false;
  }

  if ((date[2] !== '/') || (date[5] !== '/')) {
    return false;
  }

  return true;  
};

const isARateNumber = (rate) => {
  if ((Number(rate) < 1) || (Number(rate) > 5)) {
    return false;
  }

  return true;
};

const isEmptyDate = (date) => {
  if ((date.dateAt === undefined) || (date === undefined)) {  
    return true;
  }  

  if ((date.rate === undefined) || (date === undefined)) {  
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

const validateName = (name) => {
  if (isEmpty(name)) {
    return {
      status: 400,
      message: 'O campo "name" é obrigatório',
    };
  }

  if (name.length <= 2) {
    return {
      status: 400,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }  

  return {
    status: 200,
  };
};

const validateAge = (age) => {
  if (isEmpty(age)) {
    return {
      status: 400,
      message: 'O campo "age" é obrigatório',
    };
  }
  const idade = Number(age);
  if (idade < 18) {
    return {
      status: 400,
      message: 'O crush deve ser maior de idade',
    };
  }  

  return {
    status: 200,
  };
};

const validateDate = (date) => {
  if (isEmptyDate(date)) {
    return {
      status: 400,
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    };
  }

  if (!isADate(date.datedAt)) {
    return { status: 400, message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }

  if (!isARateNumber(date.rate)) {
    return { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }   
  return { status: 200 };  
};

const validateNewCrush = (infoCrush) => {
  const { name, age, date } = infoCrush;
  const statusName = validateName(name);
  const statusAge = validateAge(age);
  const statusDate = validateDate(date);

  if (statusName.status === 400) {
    return statusName;
  }

  if (statusAge.status === 400) {
    return statusAge;
  }  

  if (statusDate.status === 400) {
    return statusDate;
  }

  return { status: 200 };
};

const create = (req, res, next) => {
  const infoCrush = req.body;

  const result = validateNewCrush(infoCrush);

  if (result.status === 400) {
    return res.status(result.status).json({ message: result.message });  
  }

  next();
};

module.exports = {
  create,
};