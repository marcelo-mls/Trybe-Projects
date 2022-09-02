// const { TestScheduler } = require('jest');
const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  test('Testa se getOpeningHours é uma função', () => {
    expect(typeof getOpeningHours).toBe('function');
  });

  test('Testa se sem argumentos a função retorna agenda completa', () => {
    expect(getOpeningHours()).toEqual({
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    });
  });
  test('Para os argumentos Monday e 09:00-AM deve retornar a string The zoo is closed', () => {
    expect(getOpeningHours('Monday', '09:00-AM')).toBe('The zoo is closed');
  });
  test('Para os argumentos Tuesday e 09:00-AM deve retornar a string The zoo is closed', () => {
    expect(getOpeningHours('Tuesday', '09:00-AM')).toBe('The zoo is open');
  });
  test('Para os argumentos Segunda e 09:00-PM deve lançar uma exceção com a mensagem de erro de dia', () => {
    expect(getOpeningHours('Segunda', '09:00-PM')).toThrow('The day must be valid. Example: Monday');
  });
  test('Para os argumentos Friday e 09:00-ZM deve lançar uma exceção com a mensagem de erro de abreviação', () => {
    expect(getOpeningHours('Friday', '09:00-ZM')).toThrow('The abbreviation must be \'AM\' or \'PM\'');
  });
  test('Para os argumentos Saturday e C9:00-AM deve lançar uma exceção com a mensagem de erro de hora', () => {
    expect(getOpeningHours('Saturday', 'C9:00-AM')).toThrow('The hour should represent a number');
  });
  test('Para os argumentos Monday e 13:00-AM deve lançar uma exceção com a mensagem de erro de hora', () => {
    expect(getOpeningHours('Monday', '13:00-AM')).toThrow('The hour must be between 0 and 12');
  });
  test('Para os argumentos Tuesday e 09:60-AM deve lançar uma exceção com a mensagem de erro de minutos', () => {
    expect(getOpeningHours('Tuesday', '09:60-AM')).toThrow('The minutes must be between 0 and 59');
  });
});
