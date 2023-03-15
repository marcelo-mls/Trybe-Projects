const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const mocks = require('../../mocks/mocks');

const { expect } = chai;
chai.use(sinonChai);

describe('SALES - Testes de unidade do controller de Sales', async () => {

  it('Retorna a lista completa de vendas', async function () {

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales').resolves({ status: 200, message: mocks.allSalesResponse });

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mocks.allSalesResponse);

  })

  it('Retorna a venda correspondente ao id especificado', async function () {

    const res = {};
    const req = { params: { id: 1 } };
    

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSalesById').resolves({ status: 200, message: mocks.salesResponseById });

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mocks.salesResponseById);

  })

  afterEach(sinon.restore);
  
});