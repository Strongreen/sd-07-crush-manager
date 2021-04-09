const data = [
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
]

const numero = 3;
const idData = data.find(element => element.id === numero)

console.log(idData);
