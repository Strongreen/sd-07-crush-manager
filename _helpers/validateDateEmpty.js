// validate date empty
module.exports = (req, res, next) => {
  const { date } = req.body;
  if (!date) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};
