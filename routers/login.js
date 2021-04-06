const { Router } = require('express');

const router = Router();

const SUCCESS = 200;

const ranToken = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let str = '';
  for (let i = 0; i < length; i += 1) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

router.post('/', (_req, res) => {
  const token = ranToken(16);
  return res.status(SUCCESS).json({ token });
}); 

module.exports = router;
