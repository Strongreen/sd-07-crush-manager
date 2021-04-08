const { validName } = require('./validName');
const { validAge } = require('./validAge');
const { validDatedAt } = require('./validDatedAt');
const { validRate } = require('./validRate');
const { validDate } = require('./validDate');
const { validToken } = require('./validToken');
const { getId } = require('./getId');
const { validEmail } = require('./validEmail');
const { validPassword } = require('./validPassword');
const { CreateToken } = require('./CreateToken');

module.exports = {
    validName,
    validAge,
    validDatedAt,
    validRate,
    validDate,
    validToken,
    getId,
    validEmail,
    validPassword,
    CreateToken,
};
