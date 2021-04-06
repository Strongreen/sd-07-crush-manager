const validateAge = (req, res, next) => {
  const { age } = req.body;
  
  if (!age) {
    return res.status(401).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    return res.status(401).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  next();
};

module.exports = validateAge;
