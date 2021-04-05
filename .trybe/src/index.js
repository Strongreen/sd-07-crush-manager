// tentando criar um API

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const fs = require('fs')

app.get('/crush', (req, res) => {
    console.log ('entrou no get')
    const crushList = fs.readFileSync('./crush.json')

    if (crushList) {
        return (res.status(200).json(crushList))
    }
    if (crushList.lenght === 0) {
        return res.status(200).json([])
    }

})

app.listen(port, () => console.log(`rolê tá acontecendo na porta ${port}`));