const express = require('express');

const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    const crushArray = fs.readFileSync('./crush.json', 'utf-8');
        return res.status(200).send(JSON.parse(crushArray));
});

module.exports = app;
