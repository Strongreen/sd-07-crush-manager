const ageMiddleware = (req, res, next) => {
  const { age } = req.body;

  if (age === undefined || age.length === 0) {
    res.status(400).send({ message: 'O campo "age" é obrigatório' });
  } else if (age < 18) {
    res.status(400).send({ message: 'O crush deve ser maior de idade' });
  } else {
    next();
  }
};

module.exports = ageMiddleware;
