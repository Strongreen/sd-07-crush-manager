const checkNameMid = (req, res, next) => {
  const { name } = req.body;
  const regexName = new RegExp('.{3}');

  if (name === undefined || name.length === 0) {
    res.status(400).send({ message: 'O campo "name" é obrigatório' });
  } else if (!regexName.test(name)) {
    res
      .status(400)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else {
    next();
  }
};

module.exports = checkNameMid;
