const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');
const mocks = require('../../mocks/mocks');

describe('SALES - Testes de unidade do service de Sales', function () {

  it('Retorna a lista completa de vendas', async function () {

    sinon.stub(salesModel, 'selectAllSales').resolves(mocks.allSalesResponse);
    const result = await salesService.getAllSales();
    expect(result.message).to.be.deep.equal(mocks.allSalesResponse);

  });

  it('Retorna a venda correspondente ao id especificado', async function () {

    sinon.stub(salesModel, 'selectSalesById').resolves(mocks.salesResponseById);
    const result = await salesService.getSalesById(1);
    expect(result.message).to.be.deep.equal(mocks.salesResponseById);

  });

  afterEach(sinon.restore);
});