const condicaoAgeMiddleware = (req, res, next) => {
    const age = parseInt(req.body.age, 10);
    switch (true) {
      case !age || age === '':
        return res.status(400).json({
          message: 'O campo "age" é obrigatório',
        });
      case typeof age === 'number' && age < 18:
        return res.status(400).json({
          message: 'O crush deve ser maior de idade',
        });
      default:
        break;
    }
    next();
  };

module.exports = condicaoAgeMiddleware;