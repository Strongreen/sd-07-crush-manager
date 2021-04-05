const validateDateFormateMiddleware = (request, response, next) => {
  const { date } = request.body;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!(dateRegex.test(date.datedAt))) {
    return response.status(400)
    .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateDateFormateMiddleware;