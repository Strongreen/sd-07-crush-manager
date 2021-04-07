const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (authorization !== '7mqaVRXJSp886CGr' || authorization.length !== 16) {
    return res.status(401).send({
      message: 'Token inválido',
    });
  }
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).send({
      message: 'O crush deve ser maior de idade',
    });
  }
  next();
};

const validDate = (req, res, next) => {
  const { date } = req.body;
  if (!date || date.rate === undefined || !date.datedAt) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validDateAt = (req, res, next) => {
  const isValidDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const { datedAt } = req.body.date;
  if (!isValidDate.test(datedAt)) {
    return res.status(400).send({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const validRate = (req, res, next) => {
  const { rate } = req.body.date;
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = [authToken, validName, validAge, validDate, validDateAt, validRate];
