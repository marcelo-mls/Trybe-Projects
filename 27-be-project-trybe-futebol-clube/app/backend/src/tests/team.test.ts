import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/Teams'
import { teamsMock } from './mocks'
import { Response } from 'superagent';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testando se na camada Teams...', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore);
  
  it('É possível fazer um GET na rota /teams com sucesso;', async () => {
    sinon.stub(Teams, "findAll").resolves(teamsMock as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/teams').send()

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock)
  })
  
  it('É possível fazer um GET na rota /teams/:id com sucesso;', async () => {
    sinon.stub(Teams, "findByPk").resolves(teamsMock[0] as Teams);

    chaiHttpResponse = await chai.request(app).get('/teams/1').send()

    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock[0])
  })
});
