function validName(name) {
  if (!name) {
    throw new Error('O campo "name" é obrigatório');
  }

  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
  return true;
}

function validAge(age) {
  if (!Number.isInteger(age) && !age) {
    throw new Error('O campo "age" é obrigatório');
  }

  if (age < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
  return true;
}

function validDate(date) {
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!date || !date.rate || !date.datedAt) {
    throw new Error(
      'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    );
  }

  if (!patternData.test(date.datedAt)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }

  return true;
}

function vdate(date) {
  if (date.rate < 1 || date.rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
  return true;
}

function validateCreate(crush, body) {
  const { name, age, date } = body;

  if (validName(name) && validAge(age) && validDate(date) && vdate(date)) {
    const size = crush.length;
    const copyCrush = crush;
    copyCrush[size] = {
      id: size + 1,
      name,
      age,
      date,
    };
    return copyCrush;
  }
}

function validateToken(token) {
  if (token === undefined) {
    throw new Error('Token não encontrado');
  }
  const verifyToken = token.slice(7);
  if (verifyToken.length < 16) {
    throw new Error('Token inválido');
  }
  return true;
}

module.exports = { validateCreate, validateToken };
