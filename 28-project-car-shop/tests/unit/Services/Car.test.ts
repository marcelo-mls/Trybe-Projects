import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';

import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const mock: ICar = {
  model: 'Veiculo',
  year: 2000,
  color: 'Red',
  status: true,
  buyValue: 25.10,
  doorsQty: 4,
  seatsQty: 5,
};

describe('Testa se a camada Car Service', function () {
  it('Cria um carro com sucesso', async function () {
    const input: ICar = mock;
    const output: ICar = { ...mock, id: '63c7503a24ee7ef66de42926' };

    Sinon.stub(Model, 'create').resolves(output);
    const vehicleService = new CarService();
    const result = await vehicleService.createCar(input);
    expect(result).to.be.deep.equal(output);

    Sinon.stub(Model, 'find').resolves([output]);
    const vehiclesService = new CarService();
    const results = await vehiclesService.getCars();
    expect(results).to.be.deep.equal({ status: 200, message: [output] });
  });

  afterEach(function () {
    Sinon.restore();
  });
});