const validatePassword = (password) => /^\d{6,12}$/gm.test(password);

console.log(validatePassword('42'));