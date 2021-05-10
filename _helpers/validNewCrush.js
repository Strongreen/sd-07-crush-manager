// name validation
const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    res.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};
  
// age validation
const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    res.status(400).send({
      message: 'O crush deve ser maior de idade',
    });
  }
  next();
};

// date validation
const validateDate = (req, res, next) => {
  const { date } = req.body;
  const { datedAt, rate } = date;
  const dateRegx = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/i;

  if (!dateRegx.test(datedAt)) {
    res.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  if ((rate < 1) || (rate > 5)) {
    res.status(400).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

// validate date empty
const validateDateEmpty = (req, res, next) => {
  const { date } = req.body;
  if (!date) {
    res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  } else {
    const { datedAt, rate } = date;
    if ((!datedAt) || (!rate)) {
      res.status(400).send({
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
    }
  }
  next();
};

module.exports = {
  validateName,
  validateAge,
  validateDate,
  validateDateEmpty,
};
