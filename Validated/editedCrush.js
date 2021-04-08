const { getId } = require('./getId');

async function editedCrush(body, id) {
    const { name, age, date } = body;
    const { datedAt, rate } = date;
    const { crushes } = await getId();
    if (id) {
      const crush = {
          id,
          name,
          age,
          date: {
            datedAt,
            rate,
          },
        };
          crushes[id - 1] = crush;
      return crushes;
    }
}

module.exports = { editedCrush };
