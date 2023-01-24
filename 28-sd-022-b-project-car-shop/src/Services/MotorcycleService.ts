import { isValidObjectId } from 'mongoose';

import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleModel from '../Models/MotorcycleModel';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null) {
    if (motorcycle) { return new Motorcycle(motorcycle); }

    return null;
  }

  public async createMotorcycle(motorcycle : IMotorcycle) {
    const motorcycleModel = new MotorcycleModel();
    const newMotorcycle = await motorcycleModel.create(
      { ...motorcycle, status: motorcycle.status || false },
    );
    // (atributo status deve ser opcional e se não passado, deve ser false)

    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getMotorcycles() {
    const motorcycleModel = new MotorcycleModel();
    const motorcycles = await motorcycleModel.getAll();
    // Ajusta o id e remove o _v
    const formattedMotorcycleList = motorcycles
      .map((motorcycle) => this.createMotorcycleDomain(motorcycle));

    return { status: 200, message: formattedMotorcycleList };
  }

  public async getMotorcycleById(id : string) {
    if (!isValidObjectId(id)) {
      return { status: 422, message: { message: 'Invalid mongo id' } };
    }

    const motorcycleModel = new MotorcycleModel();
    const motorcycle = await motorcycleModel.getOneById(id);

    if (!motorcycle) {
      return { status: 404, message: { message: 'Motorcycle not found' } };
    }
    
    const theMotorcycle = this.createMotorcycleDomain(motorcycle);

    return { status: 200, message: theMotorcycle };
  }

  public async updateMotorcycle(id: string, motorcycle: IMotorcycle) {
    if (!isValidObjectId(id)) {
      return { status: 422, message: { message: 'Invalid mongo id' } };
    }

    const motorcycleModel = new MotorcycleModel();
    const theMotorcycle = await motorcycleModel.getOneById(id);

    if (!theMotorcycle) {
      return { status: 404, message: { message: 'Motorcycle not found' } };
    }
    
    await motorcycleModel.update(id, motorcycle);
    const updatedMotorcycle = await motorcycleModel.getOneById(id);
    const updatedMotorcycleFormatted = this.createMotorcycleDomain(updatedMotorcycle);

    return { status: 200, message: updatedMotorcycleFormatted };
  }
}
