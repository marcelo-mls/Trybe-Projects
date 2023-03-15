const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const totalEntrants = { child: 0, adult: 0, senior: 0 };
  totalEntrants.child = entrants.filter((entrant) => entrant.age < 18).length;
  totalEntrants.adult = entrants.filter((entrant) => entrant.age >= 18 && entrant.age < 50).length;
  totalEntrants.senior = entrants.filter((entrant) => entrant.age >= 50).length;

  return totalEntrants;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }

  const entrantsKeys = Object.keys(countEntrants(entrants));
  const { prices } = data;
  let total = 0;

  entrantsKeys.forEach((key) => {
    total += (countEntrants(entrants)[key] * prices[key]);
  });

  return total;
}

module.exports = { calculateEntry, countEntrants };
