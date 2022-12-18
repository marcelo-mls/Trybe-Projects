import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Matches from '../database/models/Matches'
import { matchesMock } from './mocks'
import { Response } from 'superagent';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testando se na camada Matches...', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);
  
  it('É possível fazer um GET na rota /matches com sucesso;', async () => {
    sinon.stub(Matches, "findAll").resolves(matchesMock as any);

    chaiHttpResponse = await chai.request(app).get('/matches').send()

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.equal(matchesMock)
  })

  it('É possível fazer um GET na rota /matches com parâmetro inProgress False;', async () => {
    sinon.stub(Matches, "findAll").resolves(matchesMock[0] as any);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false').send()

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.equal(matchesMock[0])
  })

  it('É possível fazer um GET na rota /matches com parâmetro inProgress True;', async () => {
    sinon.stub(Matches, "findAll").resolves(matchesMock[1] as any);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true').send()

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.equal(matchesMock[1])
  })

});
