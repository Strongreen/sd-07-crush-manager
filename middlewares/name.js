const findName = (name) => {
  if (!name) {
    throw new Error('O campo "name" é obrigatório');
  }
};

const nameValidation = (name) => {
  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};

const nameMiddleware = (req, res, next) => {
  const { name } = req.body;

  try {
    findName(name);
    nameValidation(name);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }

  next();
};

module.exports = nameMiddleware;
