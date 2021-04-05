const express = require('express');
const fs = require('fs');

const router = express();

const File = 'crush.json';

router.get('/', (req, res) => {
    const file = fs.readFileSync(File);
    const dataCrush = file.toString('utf8');
    const crushData = JSON.parse(dataCrush);

   if (crushData.length !== 0) {
       res.status(200).send(crushData);
    } 
    res.status(200).send([]);
});

module.exports = router;
