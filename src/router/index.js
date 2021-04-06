const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');
const middleware = require('../middleware');
const util = require('../util');
const validation = require('../validation');

const router = express.Router();

router.get('/crush', rescue(async (req, res) => {
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
    res.status(200).send(file);
}));

router.get('/crush/search', middleware.tokenMiddleware, rescue(async (req, res) => {
    res.status(200).send(await util.searchFunction(req.query));
}));

router.get('/crush/:id', middleware.getCrushMiddleware, rescue(async (req, res) => {
    const { id } = req.params;
    const file = JSON.parse(await fs.promises.readFile('./crush.json', 'utf8'));
    return res.status(200).send(await file.find((f) => f.id === Number(id)));
}));

router.post('/login', validation.postLoginValidation, (req, res) => {
    res.status(200).send({ token: util.generateToken() });
});

router.post('/crush', validation.postAttributeValidation, rescue(async (req, res) => {
    res.status(201).send(await util.createFunction(req.body));
}));

router.put('/crush/:id', validation.putAttributeValidation, rescue(async (req, res) => {
    res.status(200).send(await util.updateFunction(req.params, req.body));
}));

router.delete('/crush/:ids', middleware.tokenMiddleware, rescue(async (req, res) => {
    res.status(200).send(await util.deleteFunction(req.params));
}));

router.use(validation.pageNotFoundValidation);

router.use(middleware.errorMiddleware);

module.exports = router;
