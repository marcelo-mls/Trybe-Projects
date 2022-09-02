const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  test('Testa se handlerElephants é uma função', () => {
    expect(typeof handlerElephants).toBe('function');
  });

  test('Testa se para o argumento count o resultado é 4', () => {
    expect(handlerElephants('count')).toBe(4);
  });

  test('Testa se para o argumento names o resultado contém Jefferson', () => {
    expect(handlerElephants('names')).toContain('Jefferson');
  });

  test('Testa se para o argumento averageAge o resultado é 10.5', () => {
    expect(handlerElephants('averageAge')).toBe(10.5);
  });

  test('Testa se quando não tem argumento retorna undefined', () => {
    expect(handlerElephants()).toBe(undefined);
  });

  test('Testa se quando o argumento não é uma string retorna mensagem', () => {
    expect(handlerElephants(true)).toBe('Parâmetro inválido, é necessário uma string');
  });

  test('Testa se quando passar o argumento de popularity retorna 5', () => {
    expect(handlerElephants('popularity')).toBe(5);
  });

  test('aaa', () => {
    expect(handlerElephants('marcelo')).toBe(null);
  });
});
