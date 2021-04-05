// tentando criar um API

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const crushes = [
    {
      "name": "Madonna",
      "age": 62,
      "id": 1,
      "date": { "datedAt": "23/10/2020", "rate": 5 }
    },
    {
      "name": "Cyndi Lauper",
      "age": 67,
      "id": 2,
      "date": { "datedAt": "23/10/2020", "rate": 5 }
    },
    {
      "name": "Kendrick Lamar",
      "age": 33,
      "id": 3,
      "date": { "datedAt": "23/10/2020", "rate": 5 }
    },
    {
      "name": "Tom Holland",
      "age": 24,
      "id": 4,
      "date": { "datedAt": "23/10/2020", "rate": 5 }
    }
  ];

app.patch('/crush', (req, res) => {
    
})

app.listen(port, () => console.log(`rolê tá acontecendo na porta ${port}`));