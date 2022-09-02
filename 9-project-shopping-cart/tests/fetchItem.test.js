require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Testa se o fetch foi chamado ao executar a função fetchItem com o argumento MLB1615760527;', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('Ao chamar a função fetchItem com o argumento MLB1615760527, ela utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })
  it('O retorno da função fetchItem com o argumento MLB1615760527 é uma estrutura de dados igual ao objeto item', async () => {
    const expectObj = await fetchItem('MLB1615760527');
    expect(expectObj).toEqual(item);
  })
  it('Ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error ('You must provide an url'));
  })
  
});
