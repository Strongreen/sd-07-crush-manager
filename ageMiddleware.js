const ageMiddleware = (req, res, next) => {
  const { date } = req.body;
  if (!date || !date.datedAt || !date.rate) {
    return res.status(400).send({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    }); 
  } 
  next();
};

module.exports = ageMiddleware;
