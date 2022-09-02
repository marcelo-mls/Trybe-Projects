const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  // it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
  // ESCREVA SEUS TESTES ABAIXO:
  it('Teste se productDetails é uma função.', () => {
    expect(typeof productDetails).toBe('function');
  });

  it('Teste se o retorno da função é um array.', () => {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
    expect(Array.isArray(productDetails('Notebook', 'Mouse'))).toBe(true)
  });
  
  it('Teste se o array retornado pela função contém dois itens dentro.', () => {
    expect(productDetails('Notebook', 'Mouse').length).toBe(2)
  });
  
  it('Teste se os dois itens dentro do array retornado pela função são objetos.', () => {
    expect(typeof productDetails('Notebook', 'Mouse')[0]).toBe('object')
    expect(typeof productDetails('Notebook', 'Mouse')[1]).toBe('object')
  });
  
  it('Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.', () => {
    expect(productDetails('Notebook', 'Mouse')[0]).not.toEqual(productDetails('Notebook', 'Mouse')[1])
  });
  
  it('Teste se os dois productIds terminam com 123.', () => {
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
    expect(productDetails('Notebook', 'Mouse')[0].details.productId.endsWith('123')).toBe(true)
    expect(productDetails('Notebook', 'Mouse')[1].details.productId.endsWith('123')).toBe(true)
  });
  // });
});