const dateMiddleware = (req, res, next) => {
    const { date } = req.body;
    if (!date || !date.datedAt || date.rate === undefined) {
   return res.status(400).json(
      { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' },
    ); 
  }
  if (date.rate < 1) {
    return res.status(400).json(
       { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
     ); 
   }
    next();
  };
  
  module.exports = dateMiddleware;