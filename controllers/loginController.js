const { generateToken } = require('../services/loginService');

exports.getTokenController = async (req, res) => {
    const token = generateToken(16);
    return res.status(200).send({ token });
};
