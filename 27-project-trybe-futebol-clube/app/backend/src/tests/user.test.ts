import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Users from '../database/models/Users'
import { loginMock, userMock } from './mocks'
import { Response } from 'superagent';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Testando se na camada Users...', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
  });

  afterEach(sinon.restore);

  it('É possível fazer um POST na rota /login com sucesso;', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);

    chaiHttpResponse = await chai.request(app).post('/login').send(loginMock)
    
    expect(chaiHttpResponse.status).to.be.eq(200)
    expect(chaiHttpResponse.body.token).to.be.an('string');
  });

  it('Um POST na rota /login com requisição incorreta, retorna status 400;', async () => {
    sinon.stub(bcrypt, "compareSync").returns(true);

    chaiHttpResponse = await chai.request(app).post('/login').send(loginMock.email)

    expect(chaiHttpResponse.status).to.be.eq(400)
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  })

  it('Um POST na rota /login com dados incorretos, retorna status 401;', async () => {
    sinon.stub(bcrypt, "compareSync").returns(false);

    chaiHttpResponse = await chai.request(app).post('/login').send({email: loginMock.email, password: 'incorrect' })

    expect(chaiHttpResponse.status).to.be.eq(401)
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
  })
});
