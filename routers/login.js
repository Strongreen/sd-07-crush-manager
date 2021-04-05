const { Router } = require('express');
// const path = require('path');
// const fs = require('fs').promises;

const router = Router();

// const SUCCESS = 200;

// const dataCrush = async () => {
//  const content = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
//  return content;
// };

/*  router.post('/', async (_req, res) => {
  try {
    const crush = await dataCrush();
    if (crush.length < 1) return res.status(SUCCESS).json(JSON.parse([]));
    return res.status(SUCCESS).json(JSON.parse(crush));
  } catch (error) {
    console.log(error);
  }
}); 
*/

module.exports = router;
