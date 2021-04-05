const validatingNameOfCrushes = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < 3) {
    return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const validatingAgeOfCrushes = (req, res, next) => {
  const { age } = req.body;
  if (!Number.isInteger(age) || !age) {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  }
  return next();
};

function validarData(data) {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  // https://www.regextester.com/99555
  return re.test(data);
}

const validatingDateAndRatesOfCrushes = (req, res, next) => {
  const { date } = req.body;

  if (!date || !date.rate || !date.datedAt) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (!validarData(date.datedAt)) {
    return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  if (date.rate < 1 || date.rate > 5 || !Number.isInteger(date.rate)) {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  return next();
};

module.exports = {
  validatingNameOfCrushes,
  validatingAgeOfCrushes,
  validatingDateAndRatesOfCrushes,
};
