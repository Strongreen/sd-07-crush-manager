const fs = require('fs');

function valideDateAt(request) {
  const { date } = request.body;
  if (!date) {
    return false;
  }
  const regex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
  return regex.test(date.datedAt);
}

function valideDateAtAndRate(request) {
  const { date } = request.body;

  if (!date) {
    return false;
  }

  const { date: { datedAt, rate } } = request.body;

  return !(!rate || !datedAt);
}

module.exports = {
  validadeEmail(request, response, next) {
    const { email } = request.body;
    if (!email) {
      response.status(400).send({ message: 'O campo "email" é obrigatório' });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      response.status(400).send({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
    next();
  },
  validatePassword(request, response, next) {
    const { password } = request.body;
    if (!password) {
      response.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
      response.status(400).send({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }
    next();
  },
  async validateToken(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(401).send({ message: 'Token não encontrado' });
    }
    if (authorization.length < 16) {
      return response.status(401).send({ message: 'Token inválido' });
    }

    next();
  },
  validateName(request, response, next) {
    const { name } = request.body;
    if (!name) {
      response.status(400).send({ message: 'O campo "name" é obrigatório' });
    } else if (name.length < 3) {
      response.status(400).send({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      }).send();
    }
    next();
  },
  validateAge(request, response, next) {
    const { age } = request.body;
    if (!age) {
      response.status(400).send({ message: 'O campo "age" é obrigatório' });
    } else if (age < 18) {
      response.status(400).send({
        message: 'O crush deve ser maior de idade',
      });
    }
    next();
  },
  validateDate(request, response, next) {
    const { date } = request.body;
    const validDateAt = valideDateAt(request);
    const validDateRate = valideDateAtAndRate(request);

    if (!validDateRate) {
      response.status(400).send({
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
    } else if (!validDateAt) {
      response.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    } else if (date.rate < 1 || date.rate > 5) {
      response.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    next();
  },
};
