const { getId } = require('./getId');

async function newCrush(body) {
    const { name, age, date } = body;
    const { datedAt, rate } = date;
    const { crushes, id } = await getId();
    if (id) {
      const crush = {
          id: id + 1,
          name,
          age,
          date: {
            datedAt,
            rate,
          },
        };
        crushes[id] = crush;
      return { crush, crushes };
    }
}

module.exports = { newCrush };
