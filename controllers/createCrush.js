const handleField = (fieldName) => {
  if (fieldName === 'date') {
    return {
      error: true,
      message: `O campo "${fieldName}" é obrigatório e "datedAt" e "rate" não podem ser vazios`,
    };
  }
  return {
    error: true,
    message: `O campo "${fieldName}" é obrigatório`,
  };
};
const checkName = (name, fieldName) => {
  if (!name) return handleField(fieldName);
  if (name.length < 3) {
    return {
      error: true,
      message: `O "${fieldName}" deve ter pelo menos 3 caracteres`,
    };
  }
  return { error: false };
};
const checkAge = (age, fieldName) => {
  if (!age) return handleField(fieldName);
  if (age < 18) {
    return {
      error: true,
      message: 'O crush deve ser maior de idade',
    };
  }
  return { error: false };
};

const checkDatedAt = (datedAt, fieldName) => {
  if (!datedAt) return handleField(fieldName);
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!dateRegex.test(datedAt)) {
    return {
      error: true,
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
  return { error: false };
};

const checkRate = (rate, fieldName) => {
  if (rate === undefined) return handleField(fieldName);
  if (rate < 1 || rate > 5) {
    return {
      error: true,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }
  return { error: false };
};
const checkDate = (date, fieldName) => {
  if (date === undefined) return handleField(fieldName);

  const testDatedAtResult = checkDatedAt(date.datedAt, 'date');
  if (testDatedAtResult.error) {
    return testDatedAtResult;
  }
  const testRateResult = checkRate(date.rate, 'date');
  if (testRateResult.error) {
    return testRateResult;
  }
  return { error: false };
};

module.exports = {
  handleField,
  checkDate,
  checkAge,
  checkName,
};
