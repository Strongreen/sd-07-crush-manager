const BAD_REQUEST = 400;
const validateDateMiddleware = (request, response, next) => {
  const { date } = request.body;
  try {
    if (!date || !date.datedAt) {
      throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
    }  
  
    const dateRegex = /^\d\d[/]\d\d[/]\d\d\d\d$/;  
  
    if (!(dateRegex.test(date.datedAt))) {
      throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
    }  
    next();
  } catch (error) {
    response.status(BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = validateDateMiddleware;