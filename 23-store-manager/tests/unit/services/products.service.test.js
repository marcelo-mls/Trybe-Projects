const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const mocks = require('../../mocks/mocks');

describe('PRODUCTS - Testes de unidade do service de Products', function () {

  it('Retorna a lista completa de produtos', async function () {

    sinon.stub(productsModel, 'selectAllProducts').resolves(mocks.allProductsResponse);
    const result = await productsService.getAllProducts();
    expect(result.message).to.be.deep.equal(mocks.allProductsResponse);

  });

  it('Retorna o produto correspondente ao id especificado', async function () {

    sinon.stub(productsModel, 'selectProductById').resolves(mocks.allProductsResponse[0]);
    const result = await productsService.getProductsById(1);
    expect(result.message).to.be.deep.equal(mocks.allProductsResponse[0]);

  });

  afterEach(sinon.restore);
});