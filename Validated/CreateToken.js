const crypto = require('crypto');

function CreateToken() {
    const token = {
        token: crypto.randomBytes(12).toString('base64'),
      };
    return token;
}

module.exports = { CreateToken };
