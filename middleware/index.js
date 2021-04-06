const loginMiddleware = require('./loginHandle');
const { tokenMiddleware } = require('./tokenHandle');
const newEntryMiddleware = require('./newEntryHandle');
const errorMiddleware = require('./errorHandle');

module.exports = { loginMiddleware, errorMiddleware, tokenMiddleware, newEntryMiddleware };
