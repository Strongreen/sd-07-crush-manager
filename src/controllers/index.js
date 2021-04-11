const crushInfo = require('../../crush.json'); 

const SUCCESS = 200;
const FAIL = 500;

const getCrushes = async (req, res) => {
  try {
    const results = await crushInfo;
    res.status(SUCCESS).json(results);
  } catch (error) {
    console.error(error);
    res.status(FAIL).json({ menssage: error.menssage });
  }
};

module.exports = { getCrushes };
