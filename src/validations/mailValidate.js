const mailValidate = (email) => {
  const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/);
  const emailIsValid = regexEmail.test(email);
  if (email === '' || email === undefined) throw new Error('O campo "email" é obrigatório');
  if (!emailIsValid) throw new Error('O "email" deve ter o formato "email@email.com"');
  return false;
};

module.exports = mailValidate;
