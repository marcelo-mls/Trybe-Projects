import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';

import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const mock: IMotorcycle = {
  model: 'Veiculo',
  year: 2000,
  color: 'Red',
  status: true,
  buyValue: 25.10,
  category: 'Custom',
  engineCapacity: 5,
};

describe('Testa se a camada Motorcycle Service', function () {
  it('Cria uma moto com sucesso', async function () {
    const input: IMotorcycle = mock;
    const output: IMotorcycle = { ...mock, id: '63c7538fdc14c31469fb9d51' };

    Sinon.stub(Model, 'create').resolves(output);
    const vehicleService = new MotorcycleService();
    const result = await vehicleService.createMotorcycle(input);
    expect(result).to.be.deep.equal(output);

    Sinon.stub(Model, 'find').resolves([output]);
    const vehiclesService = new MotorcycleService();
    const results = await vehiclesService.getMotorcycles();
    expect(results).to.be.deep.equal({ status: 200, message: [output] });
  });

  afterEach(function () {
    Sinon.restore();
  });
});