function validEmailFunction(email, response) {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  
    if (!email) {
      response.status(400).send({
       message: 'O campo "email" é obrigatório',
      });
      throw new Error('O campo "email" é obrigatório');
    }
    if (!regexEmail.test(email)) {
      response.status(400).send({ 
        message: 'O "email" deve ter o formato "email@email.com"',
      });
      throw new Error('O "email" deve ter o formato "email@email.com"');
    }
}

module.exports = { validEmailFunction };