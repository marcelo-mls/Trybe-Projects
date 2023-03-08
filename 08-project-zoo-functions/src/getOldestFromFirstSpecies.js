const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const getEmployee = data.employees.find((employee) => employee.id === id);
  const firstSpecie = getEmployee.responsibleFor[0];
  const animals = data.species.find((specie) => specie.id === firstSpecie).residents;
  const oldestAnimal = animals.reduce((acc, crr) => ((acc.age > crr.age) ? acc : crr));
  return Object.values(oldestAnimal);
}

console.log(getOldestFromFirstSpecies('b0dc644a-5335-489b-8a2c-4e086c7819a2'));

module.exports = getOldestFromFirstSpecies;
