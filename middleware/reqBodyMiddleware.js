const BAD_REQUEST = 400;

const erroBody = {
  NULL_NAME: 'O campo "name" é obrigatório',
  NAME_SIZE: 'O "name" deve ter pelo menos 3 caracteres',
  NULL_AGE: 'O campo "age" é obrigatório',
  AGE_SIZE: 'O crush deve ser maior de idade',
};

module.exports = (request, response, next) => {
  const { name, age } = request.body;
  if (!name) {
 return response.status(BAD_REQUEST)
    .json({ message: erroBody.NULL_NAME });
  }
  if (name.length < 3) {
 return response.status(BAD_REQUEST)
    .json({ message: erroBody.NAME_SIZE });
  }
  if (!age) {
 return response.status(BAD_REQUEST)
    .json({ message: erroBody.NULL_AGE });
  }
  if (age < 18) {
 return response.status(BAD_REQUEST)
    .json({ message: erroBody.AGE_SIZE });
  }
  next();
};