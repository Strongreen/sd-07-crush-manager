const validateName = (name) => {
  if (!name) {
    throw new Error('O campo "name" é obrigatório');
  }
  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};

const validateAge = (age) => {
  if (!age) {
    throw new Error('O campo "age" é obrigatório');
  }
  if (age < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
};

const validateDate = (date) => {
  if (date === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
  if (date.datedAt === undefined || date.rate === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
   }
}; 

const validateDatedAt = (datedAt) => {
  const regex = /(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})/;
  const verifyDate = regex.test(datedAt);

  if (verifyDate === false) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validateRate = (rate) => {
  if (typeof rate !== 'number' || rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

module.exports = {
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateDatedAt,
};
