const fs = require('fs');

const db = 'crush.json';

const dbRead = () => new Promise((resolve, reject) => {
  fs.readFile(db, 'utf-8', (err, data) => {
    if (err) return reject(err);
    const dataJson = JSON.parse(data);
    resolve(dataJson);
  });
});

const dbPush = (name, age, date) => new Promise((resolve, reject) => {
  dbRead()
    .then((data) => {
      const newCrush = {
        id: data.length + 1,
        name,
        age,
        date,
      };

      const string = JSON.stringify([...data, newCrush]);
      fs.writeFile(db, string, (err) => {
        if (err) return reject(err);
        resolve(newCrush);
      });
    });
});

const dbEdit = (name, age, date, id) => new Promise((resolve, _reject) => {
  dbRead()
    .then((data) => {
      const editedCrush = { id, name, age, date };

      const newData = data.map((crush) => {
        if (crush.id === Number(id)) return editedCrush;
        return crush;
      });
      const string = JSON.stringify(newData);
      fs.writeFile(db, string, (_err) => {
        // if (err) return reject(err);
        resolve(editedCrush);
      });
    });
});

module.exports = { dbRead, dbPush, dbEdit };
