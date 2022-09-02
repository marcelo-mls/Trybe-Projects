const { employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const finalResult = employees.map((employee) => ({
  id: employee.id,
  fullName: `${employee.firstName} ${employee.lastName}`,
  species: employee.responsibleFor.map((animalId) =>
    data.species.find((specie) =>
      specie.id === animalId).name),
  locations: employee.responsibleFor.map((animalId) =>
    data.species.find((specie) =>
      specie.id === animalId).location),
}));

function parameterChecker(parameter) {
  const parameterValue = Object.values(parameter)[0];
  const arrOfParameter = [];

  finalResult.forEach((result) => arrOfParameter.push(...(result.fullName.split(' ')), result.id));

  return arrOfParameter.includes(parameterValue);
}

function getEmployeesCoverage(parameter) {
  if (!parameter) {
    return finalResult;
  }

  if (!parameterChecker(parameter)) {
    throw new Error('Informações inválidas');
  }

  if (parameter.id) {
    return finalResult.find((employee) => parameter.id === employee.id);
  }

  if (parameter.name) {
    return finalResult.find((employee) => employee.fullName.split(' ').includes(parameter.name));
  }
}

module.exports = getEmployeesCoverage;
