const nameCheck = (name) => {
  if (!name || name.length === 0) return { message: 'O campo "name" é obrigatório' };
  if (name.length < 3) return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  return null;
};

const ageCheck = (age) => {
  if (!age || age.length === 0) return { message: 'O campo "age" é obrigatório' };
  if (age < 18) return { message: 'O crush deve ser maior de idade' };
  return null;
};

const dateAtInDateCheck = (datedAt, rate) => {
  if (!datedAt || !rate || datedAt.length === 0 || rate.length === 0) {
    return { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' };
  }
};

const dateInCheck = (date) => {
  const { datedAt, rate } = date;

  const dateAtInDateCheckReturn = dateAtInDateCheck(datedAt);
  if (dateAtInDateCheckReturn) return dateAtInDateCheckReturn;

  if (!datedAt.includes('/')) {
    return { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (rate < 1 || rate > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return null;
};

module.exports = (req, res, next) => {
  const { name, age, date } = req.body;

  const nameErrorMessage = nameCheck(name);
  if (nameErrorMessage) return res.status(400).send(nameErrorMessage);

  const ageErrorMessage = ageCheck(age);
  if (ageErrorMessage) return res.status(400).send(ageErrorMessage);

  if (!date) {
    return res.status(400).send(
      { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' },
    );
  }

  const dateErrorMessage = dateInCheck(date);
  if (dateErrorMessage) return res.status(400).send(dateErrorMessage);

  next();
};
