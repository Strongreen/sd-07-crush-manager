const express = require('express');

const validEmailPassword = require('../middlewares/validEmailPassword');
const createToken = require('../middlewares/createToken');

const router = express.Router();

router.post('/', validEmailPassword, createToken, (req, res) => {
  res.status(200).json({ token: `${req.headers.Authorization}` });
});

module.exports = router;
