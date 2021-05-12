const generateToken = require('../helpers/token');
const { validateEmail, validatePassword } = require('../helpers/validations');

function create(request, response) {
  const { email, password } = request.body;
  try {
    if (validateEmail(email) && validatePassword(password)) {
      const token = generateToken();
      return response.status(200).json({ token });
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
}

module.exports = { create };
