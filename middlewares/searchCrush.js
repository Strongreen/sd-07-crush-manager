const fs = require('fs').promises;

const readDB = async () =>
  fs.readFile('./crush.json', 'utf-8', (crushes) => {
    if (!crushes) throw new Error('error');
    return JSON.parse(crushes);
  });

const writeInDB = async (crushes) => {
  fs.writeFile('./crush.json', JSON.stringify(crushes), (err) => {
    if (err) throw new Error('error');
  });
};

function notDoneName(valueName, objres) {
  if (!valueName) {
    return objres.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (String(valueName).length < 3) {
    return objres
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function notDoneAge(value, objres) {
  if (!value) {
    return objres.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (value < 18) {
    return objres.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
}

function notDoneRate(value, objres) {
  if (value < 1 || value > 5) {
    return objres
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function notDoneDateDatedatrate(paramDate, paramDateAt, paramRate, objres) {
  if (!paramDate || !paramDateAt || !paramRate) {
    return objres.status(400).json({
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
}

function fnRegexDate(valueDateAdt, objres) {
  const regexDate = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/g;
  if (!regexDate.test(String(valueDateAdt))) {
    return objres
      .status(400)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

async function searchCrush(req, res, next) {
  const { name, age, date } = req.body;
  const { datedAt, rate } = req.body.date ? date : '';
  notDoneName(name, res);
  notDoneAge(age, res);
  notDoneRate(rate, res);
  notDoneDateDatedatrate(date, datedAt, rate, res);
  fnRegexDate(datedAt, res);
  const oldDBCrush = await readDB();
  const newDBCrush = [
    ...oldDBCrush,
    { ...req.body, id: JSON.parse(oldDBCrush).length + 1 },
  ];
  await writeInDB(newDBCrush);
  next();
  return res
    .status(201)
    .json({ ...req.body, id: JSON.parse(oldDBCrush).length + 1 });
}
module.exports = searchCrush;
