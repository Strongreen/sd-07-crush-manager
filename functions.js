function gerarToken(tamanhoToken) {
  const caracteres = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';
  const qtdCaracteres = caracteres.length;
  let token = '';
  for (let i = 1; i <= tamanhoToken; i += 1) {
    const sorteado = Math.floor(Math.random() * qtdCaracteres);
    token += caracteres.charAt(sorteado);
  }
  return token;
}

function validarEmail(email) {
  const parseEmail = /\S+@\S+\.\S+/;
  if (email === '' || email === undefined) {
    throw new Error('O campo "email" é obrigatório');
  } else if (parseEmail.test(email) === false) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

function validarSenha(password) {
  if (password === '' || password === undefined) {
    throw new Error('O campo "password" é obrigatório');
  } else if (password.toString().length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
}

function validaNome(name) {
  if (name === '' || name === undefined) {
    throw new Error('O campo "name" é obrigatório');
  } else if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
}

function validaIdade(idade) {
  if (idade === '' || idade === undefined) {
    throw new Error('O campo "age" é obrigatório');
  } else if (idade < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
}

function validaDatedAtIsValid(newCrush) {
  if (newCrush.date.datedAt === '' || newCrush.date.datedAt === undefined) {
    return true;
  }
}

function validaDate(newCrush) {
  if (
    newCrush.date === undefined
    || validaDatedAtIsValid(newCrush)
    || newCrush.date.rate === ''
    || newCrush.date.rate === undefined
    ) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
}

function validaDatedAt(datedAt) {
  const formatoValido = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!formatoValido.test(datedAt)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function validaRate(rate) {
  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function validaRegras(newData) {
  validaNome(newData.name);
  validaIdade(newData.age);
  validaDate(newData);
  validaDatedAt(newData.date.datedAt);
  validaRate(newData.date.rate);
}

function validaToken(token) {
  let message = 'OK';
  if (token === undefined) {
    message = 'Token não encontrado';
  } else if (token.length < 16) {
    message = 'Token inválido';
  }
  return message;
}

module.exports = {
  validaToken,
  validarEmail,
  validarSenha,
  gerarToken,
  validaRegras,
};
