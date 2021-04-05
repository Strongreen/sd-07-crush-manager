const status = require('../helpers/status');

const validDateMiddleware = (request, response, next) => {
  const { date } = request.body;

  const validDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  if (!validDate.test(date.datedAt)) {
 return response.status(status.BAD_REQUEST).json(
    { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' },
    ); 
}

  next();
};

module.exports = validDateMiddleware;
