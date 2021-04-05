const status = require('../helpers/status');

const dateMiddleware = (request, response, next) => {
  const { date } = request.body;
  if (!date || !date.datedAt || !date.rate) {
 return response.status(status.BAD_REQUEST).json(
    { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' },
  ); 
} 

  if (date.rate < 1) {
 return response.status(status.BAD_REQUEST).json(
    { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
  ); 
}
  next();
};

module.exports = dateMiddleware;
