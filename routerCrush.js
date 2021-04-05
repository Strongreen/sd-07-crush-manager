const express = require('express');
const { list, add, edit, del } = require('./services/fslol');

const router = express.Router();

router.get('/', (req, res) => {
  list()
    .then((r) => res.json(r))
    .catch((err) => {
      console.log('tamo no get', err);
      res.json([]);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  list()
    .then((r) => {
      const doesPersonExists = r.find(
        (person) => person.id === parseInt(id, 10),
      );
      if (doesPersonExists) {
        return res.json(doesPersonExists);
      }
      return res.status(404).json({
        message: 'Crush não encontrado',
      });
    })
    .catch((err) => {
      console.log('tamo no get', err);
      res.json([]);
    });
});

const validaToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization && authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validetaName = (name) => {
  if (!name) {
    return {
      message: 'O campo "name" é obrigatório',
    };
  }
  if (name.length < 3) {
    return {
      message: 'O "name" deve ter pelo menos 3 caracteres',
    };
  }
  return true;
};

const validateAge = (age) => {
  if (!age) {
    return {
      message: 'O campo "age" é obrigatório',
    };
  }
  if (age < 18) {
    return {
      message: 'O crush deve ser maior de idade',
    };
  }
  return true;
};

const wasDatePassed = (date) => {
  if (
    !date
    || !date.datedAt
    || (!parseInt(date.rate, 10) && parseInt(date.rate, 10) !== 0)
  ) {
    return {
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    };
  }
  return true;
};

const validateDate = (date) => {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  const wasPassed = wasDatePassed(date);
  if (wasPassed !== true) {
    return wasPassed;
  }

  if (!dateRegex.test(date.datedAt)) {
    return { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (date.rate < 1 || date.rate > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return true;
};

const validaCorpoeHeader = (req, res, next) => {
  const { name, age, date } = req.body;

  const isNameValid = validetaName(name);
  if (isNameValid !== true) {
    return res.status(400).json(isNameValid);
  }
  const isAgeValid = validateAge(age);
  if (isAgeValid !== true) {
    return res.status(400).json(isAgeValid);
  }
  const isDateValid = validateDate(date);
  if (isDateValid !== true) {
    return res.status(400).json(isDateValid);
  }

  next();
};
// const idCount = 0;
router.post('/', validaToken, validaCorpoeHeader, (req, res) => {
  console.log('ta td certo, logica de adicao');
  const { name, age, date } = req.body;
  const resp = { id: 5, name, age, date };
  // idCount += 1;
  add(resp);
  return res.status(201).json(resp);
});

router.put('/:id', validaToken, validaCorpoeHeader, (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  edit(parseInt(id, 10), { name, age, date }).then((r) => {
    console.log(r);
    res.status(200).json({ id: parseInt(id, 10), name, age, date });
  });
});

router.delete('/:id', validaToken, (req, res) => {
  const { id } = req.params;
  del(parseInt(id, 10)).then((r) => {
    console.log(r);
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  });
});

module.exports = router;
