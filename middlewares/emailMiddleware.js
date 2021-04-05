const status = require('../helpers/status');
const { validEmail } = require('../helpers');

const emailMiddleware = (request, response, next) => {
  const { email } = request.body;
  if (!email) {
    return response.status(status.BAD_REQUEST).json(
       { message: 'O campo "email" é obrigatório' },
       ); 
   }
     if (!validEmail(email)) {
    return response.status(status.BAD_REQUEST).json(
       { message: 'O "email" deve ter o formato "email@email.com"' },
       ); 
   }

  next();
};

module.exports = emailMiddleware;
