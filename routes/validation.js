const message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

const validateName = (name, res) => {
  if (name) {
    if (name.length > 3) {
      return true;
    }
    return res
      .status(400)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return res.status(400).send({ message: 'O campo "name" é obrigatório' });
};

const validateDate = (date, res) => {
  const dateFormate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (date !== undefined) {
    if (date.match(dateFormate)) {
      return true;
    }
    return res.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return res
    .status(400)
    .json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
};

const validateAge = (age, res) => {
  if (age !== undefined) {
    if (age > 18) {
      return true;
    }
    return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }
  return res.status(400).send({ message: 'O campo "age" é obrigatório' });
};

const validateRate = (rate, res) => {
  if (rate !== undefined && Number.isInteger(rate)) {
    if (rate <= 5 && rate > 0) {
      return true;
    }
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return res.status(400).send({
    message,
  });
};

const validationToken = (header, token, nameToken, res) => {
  if (token !== undefined) {
      if (token !== '99999999') {
        return true;
      }
      return res.status(401).send({
        message: 'Token inválido',
      });   
  }
  return res.status(401).json({
    message: 'Token não encontrado',
  });
};

const validateDataObject = (date, res) => {
  if (date !== undefined) {
    return true;
  }
  return res.status(400).send({
    message,
  });
};

module.exports = {
  validateName,
  validateDate,
  validateAge,
  validateRate,
  validationToken,
  validateDataObject,
};
