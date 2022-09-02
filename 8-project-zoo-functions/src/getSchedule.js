const data = require('../data/zoo_data');

const { hours, species } = data;
const allAnimals = species.map((specie) => specie.name);
const allDays = Object.keys(hours);
const schedule = {};

function getofficeHourAndExhibition(parameter) {
  schedule[parameter] = {
    officeHour: `Open from ${hours[parameter].open}am until ${hours[parameter].close}pm`,
    exhibition: species.filter((specie) => specie.availability.includes(parameter))
      .map((animal) => animal.name) };
}

allDays.map((day) => getofficeHourAndExhibition(day));

schedule.Monday = { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };

function parameterChecker(parameter) {
  return !allAnimals.includes(parameter) && !allDays.includes(parameter);
}

function getSchedule(scheduleTarget) {
  if (!scheduleTarget) {
    return schedule;
  }
  if (parameterChecker(scheduleTarget)) {
    return schedule;
  }
  if (allAnimals.includes(scheduleTarget)) {
    return species.filter((specie) => specie.name === scheduleTarget)
      .map((element) => element.availability)[0];
  }
  if (allDays.includes(scheduleTarget)) {
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
    return Object.fromEntries([[scheduleTarget, schedule[scheduleTarget]]]);
  }
}

module.exports = getSchedule;
