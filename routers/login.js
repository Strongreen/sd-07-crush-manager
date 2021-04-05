const express = require('express');

const router = express.Router();
const emailRegex = require('../middlewares/emailRegex');
const emptyEmail = require('../middlewares/emptyEmail');
const emptyPassword = require('../middlewares/emptyPassword');
const passwordLength = require('../middlewares/passwordLength');

router.use(emptyEmail);
router.use(emptyPassword);
router.use(emailRegex);
router.use(passwordLength);

router.post('/', (req, res) => res.status(200).send({ token: 'Art394384FG0Lu49' }));

module.exports = router;