const loginMiddleware = require('./loginHandle');
const { tokenMiddleware } = require('./tokenHandle');
const errorMiddleware = require('./errorHandle');

module.exports = { loginMiddleware, errorMiddleware, tokenMiddleware };
