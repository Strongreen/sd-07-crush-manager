const fs = require('fs');
const express = require('express');

const app = express();

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  const filteredCrush = data.find((crush) => crush.id === parseInt(id, 10));
  if (filteredCrush) {
   return res.status(200).json(filteredCrush);
  }
  res.status(404).json({ message: 'Crush não encontrado' });
});

module.exports = app;

// function updateFromDb({ id: idCrush, name, age, date }) {
//   const recipeToUpdateIndex = crushJson.findIndex(
//     ({ id }) => id === idCrush,
//   );
//   if (recipeToUpdateIndex === -1) {
//     return null;
//   }
//   const newRecipe = {
//     id: idCrush,
//     name,
//     age,
//     date,
//   };
//   crushJson.splice(idCrush, 1, newRecipe);
//   return newRecipe;
// }

// app.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, age, date } = req.body;
//   const updatedRecipe = updateFromDb({ id, name, age, date });
//   if (updatedRecipe) {
//     return res.status(200).json(updatedRecipe);
//   }
// });

// function deleteFromDb(recipeToDeleteId) {
//   const recipeToDeleteIndex = crushJson.findIndex(({ id }) => id === recipeToDeleteId);
//   if (recipeToDeleteIndex === -1) {
//     return null;
//   }

//   const deletedElement = crushJson.splice(recipeToDeleteIndex, 1)[0];
//   return deletedElement;
// }

// app.delete('/crush/:id', (req, res) => {
//   const { id } = req.params;
//   const deletedRecipe = deleteFromDb(id);
//   if (deletedRecipe) {
//     return res.status(200).json({ message: 'Crush deletado com sucesso' });
//   }
// });