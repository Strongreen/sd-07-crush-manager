function validPassword(password) {
  const messagem = 'A "senha" deve ter pelo menos 6 caracteres';
  const message = 'O campo "password" é obrigatório';
  if (!password) {
    throw new Error(message);
  }  
  if (password.length < 6) {
    throw new Error(messagem); 
  }
}

module.exports = { validPassword };
