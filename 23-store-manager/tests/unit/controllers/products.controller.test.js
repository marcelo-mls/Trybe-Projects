const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/product.controller');
const mocks = require('../../mocks/mocks');

const { expect } = chai;
chai.use(sinonChai);

describe('PRODUCTS - Testes de unidade do controller de Products', async () => {

  it('Retorna a lista completa de produtos', async function () {

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAllProducts').resolves({ status: 200, message: mocks.allProductsResponse });

    await productsController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mocks.allProductsResponse);

  })

  it('Retorna o produto correspondente ao id especificado', async function () {

    const res = {};
    const req = { params: { id: 1 } };
    

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProductsById').resolves({ status: 200, message: mocks.allProductsResponse[0] });

    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mocks.allProductsResponse[0]);

  })

  afterEach(sinon.restore);
  
});