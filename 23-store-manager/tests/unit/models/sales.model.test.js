const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const mocks = require('../../mocks/mocks');

describe('SALES - Testes de unidade do model de Sales', function () {

  it('Recuperando todas as vendas com SELECT ALL', async function () {

    sinon.stub(connection, 'execute').resolves([mocks.allSalesResponse]);
    const result = await salesModel.selectAllSales();
    expect(result).to.be.deep.equal(mocks.allSalesResponse);

  });

  it('Recuperando uma venda com SELECT / WHERE de seu id', async function () {

    sinon.stub(connection, 'execute').resolves([mocks.salesResponseById]);
    const result = await salesModel.selectSalesById(2);
    expect(result).to.be.deep.equal(mocks.salesResponseById);

  });

  afterEach(sinon.restore);
});