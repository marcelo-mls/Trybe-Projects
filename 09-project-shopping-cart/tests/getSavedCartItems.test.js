const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  
  it('Testa se o método localStorage.setItem foi chamado ao executar a função getSavedCartItems com o argumento', () => {
    getSavedCartItems();
    expect(localStorage.setItem).toHaveBeenCalled();
  })
  it('Ao chamar a função getSavedCartItems o método localStorage.setItem foi chamado com o parâmetro cartItems', () => {
    getSavedCartItems();
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems');
  })
  
});
