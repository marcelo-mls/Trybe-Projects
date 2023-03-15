const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const mocks = require('../../mocks/mocks');

describe('PRODUCTS - Testes de unidade do model de Products', function () {

  it('Recuperando todos os product com SELECT ALL', async function () {

    sinon.stub(connection, 'execute').resolves([mocks.allProductsResponse]);
    const result = await productsModel.selectAllProducts();
    expect(result).to.be.deep.equal(mocks.allProductsResponse);

  });

  it('Recuperando um product com SELECT / WHERE de seu id', async function () {

    sinon.stub(connection, 'execute').resolves([mocks.allProductsResponse]);
    const result = await productsModel.selectProductById(1);
    expect(result).to.be.deep.equal(mocks.allProductsResponse[0]);

  });

  afterEach(sinon.restore);
});