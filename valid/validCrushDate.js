const mnsg = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';

function validDateFunction(request, response, next) {
  const { date } = request.body;
  if (!date) {
    return response.status(400).json({
      message: mnsg,
    });
  }
  next();
}

function validRateFunction(request, response, next) {
  const { date } = request.body;
  const { rate } = date;
  if (!rate) {
    return response.status(400).json({
      message: mnsg,
    });
  }
  if (rate < 1 || rate > 5) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
}

function validDatedAtFunction(request, response, next) {
  const { date } = request.body;
  const { datedAt } = date;
  const 
  regexDate = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/;
  if (!datedAt) {
    console.log('date nao exist');
    return response.status(400).json({
      message: mnsg,
    });
  }
  if (!regexDate.test(datedAt)) {
    console.log('date errado');
    return response.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

module.exports = { validDateFunction, validRateFunction, validDatedAtFunction };