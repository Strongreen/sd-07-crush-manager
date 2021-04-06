const isValid = (password, user) => {
    const NUM_PASSWORD = 5;

    if (user && password) {
        const emailTest = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(user);
        console.log(emailTest);
        const passLength = (password.length > NUM_PASSWORD);
        if (emailTest && passLength) {
         return true;
        }
      }
};

module.exports = isValid;
