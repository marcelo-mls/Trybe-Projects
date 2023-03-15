const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  
  it('Testa se o método localStorage.setItem foi chamado ao executar a função saveCartItems com o argumento <ol><li>Item</li></ol>;', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Ao chamar a função saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem foi chamado com dois parâmetros, primeiro cartItems e segundo sendo o valor passado como argumento para saveCartItems', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
  
});
