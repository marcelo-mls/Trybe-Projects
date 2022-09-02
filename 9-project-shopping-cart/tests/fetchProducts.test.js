require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('Testa se o fetch foi chamado ao executar a função fetchProducts com o argumento computador;', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('Ao chamar a função fetchProducts com o argumento computador, ela utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })
  it('O retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const expectObj = await fetchProducts('computador');
    expect(expectObj).toEqual(computadorSearch);
  })
  it('Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error ('You must provide an url'));
  })
});
