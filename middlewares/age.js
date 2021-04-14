const findAge = (age) => {
  if (!age) {
    throw new Error('O campo "age" é obrigatório');
  }
};

const ageVerification = (age) => {
  if (age < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
};

const ageMiddleware = (req, res, next) => {
  const { age } = req.body;

  try {
    findAge(age);
    ageVerification(age);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }

  next();
};

module.exports = ageMiddleware;
