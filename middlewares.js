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

  return !(rate === undefined || !datedAt);
}

module.exports = {
  validadeEmail(request, response, next) {
    const { email } = request.body;
    if (!email) {
      return response.status(400).send({ message: 'O campo "email" é obrigatório' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return response.status(400).send({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
    next();
  },
  validatePassword(request, response, next) {
    const { password } = request.body;
    if (!password) {
      return response.status(400).send({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return response.status(400).send({
        message: 'A "senha" deve ter pelo menos 6 caracteres',
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
      return response.status(400).send({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return response.status(400).send({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      }).send();
    }
    next();
  },
  validateAge(request, response, next) {
    const { age } = request.body;
    if (!age) {
      return response.status(400).send({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return response.status(400).send({
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
      return response.status(400).send({
        message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
    }
    if (!validDateAt) {
      return response.status(400)
        .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (date.rate < 1 || date.rate > 5) {
      return response.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }

    next();
  },
};
