const checkEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/.test(email);
// https://www.w3resource.com/javascript/form/email-validation.php;

const emailMiddiware = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  } else if (!checkEmail(email)) {
    res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } else {
    next();
  }
};

module.exports = emailMiddiware;
