const validaData = (data) => {
    const regex = /(((^0|^1|^2)[0-9])|(^3[0-1]))\/((0[0-9])|(1[0-2]))\/(((19|20)[0-9]{2}$))/gm;
    return regex.test(data);
  };
  
const dateMiddleware = (req, res, next) => {
    const { date } = req.body;
    switch (true) {
      case date.rate < 1 || date.rate > 5:
        return res
          .status(400)
          .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
      case !validaData(date.datedAt):
        return res
          .status(400)
          .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
      default:
        break;
    }
    next();
  };

  module.exports = dateMiddleware; 