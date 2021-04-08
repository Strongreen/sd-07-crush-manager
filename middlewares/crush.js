function notDoneName(req, res, next) {
  const { name } = req.body;  
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (String(name).length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function notDoneAge(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (typeof age === 'number' && age < 18) {
    return res
      .status(400)
      .json({ message: 'O crush deve ser maior de idade' });
  }
  next();
}

function notDoneRate(req, res, next) {
  const { date } = req.body;
  const { rate } = req.body.date ? date : '';
  if (rate < 1 || rate > 5) {
    return res
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

function notDoneDateDatedatrate(req, res, next) {
  const { date } = req.body;
  const { datedAt, rate } = req.body.date ? date : '';
  if (!date || !datedAt || !rate) {
    return res.status(400).json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

function fnRegexDate(req, res, next) {
  const { date } = req.body;
  const { datedAt } = req.body.date ? date : '';  
  const regexDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/g;
  if (!regexDate.test(String(datedAt))) {
    return res
      .status(400)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

module.exports = {
  notDoneName,
  notDoneAge,
  notDoneRate,
  notDoneDateDatedatrate,
  fnRegexDate,
};
