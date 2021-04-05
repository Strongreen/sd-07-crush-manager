const fs = require('fs');
const crush = require('../crush.json')

const registerCrushMiddware = (req, res, _next) => {
    const { body } = req
    const result = {
        ...body,
        id:crush.length +1
    }
    crush.push(result);
    fs.writeFile(`${__dirname}/../crush.json`,JSON.stringify(crush,null,' '),(err) => {
        if(err) {
            throw err
        }
    })
    res.status(201).send(body)
}

module.exports = registerCrushMiddware;