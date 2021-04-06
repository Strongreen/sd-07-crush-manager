const validationEmail = (email) => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          return true;
    }
    return false;
};

module.exports = validationEmail;
