const { readFiles } = require('./readFiles');
const { identifyID } = require('./identifyID');
const { login } = require('./login');
const { addCrush } = require('./addCrush');
const { writeFiles } = require('./writeFiles');
const { editCrush } = require('./editCrush');

module.exports = {
    readFiles,
    identifyID,
    login,
    addCrush,
    writeFiles,
    editCrush,
};
