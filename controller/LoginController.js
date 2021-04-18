const { genRanHex } = require('../helpers');

const addLogin = async (_req, res) => {
    console.log('[LOGIN CONTROLLER] : CHAMOU O MÉTODO BUSCAR CRUSHS');
   
        const newToken = genRanHex(16);
        res.setHeader('authorization', newToken);
        res.status(200).json({ token: newToken });
  };

module.exports = { addLogin };
