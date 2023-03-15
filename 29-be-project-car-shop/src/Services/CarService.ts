import { isValidObjectId } from 'mongoose';

import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/CarModel';

export default class CarService {
  private createCarDomain(car: ICar | null) {
    if (car) { return new Car(car); }

    return null;
  }

  public async createCar(car : ICar) {
    const carModel = new CarModel();
    const newCar = await carModel.create({ ...car, status: car.status || false });
    // (atributo status deve ser opcional e se não passado, deve ser false)

    return this.createCarDomain(newCar);
  }

  public async getCars() {
    const carModel = new CarModel();
    const cars = await carModel.getAll();
    // Ajusta o id e remove o _v
    const formattedCarsList = cars.map((car) => this.createCarDomain(car));

    return { status: 200, message: formattedCarsList };
  }

  public async getCarById(id : string) {
    if (!isValidObjectId(id)) {
      return { status: 422, message: { message: 'Invalid mongo id' } };
    }

    const carModel = new CarModel();
    const car = await carModel.getOneById(id);

    if (!car) {
      return { status: 404, message: { message: 'Car not found' } };
    }
    
    const theCar = this.createCarDomain(car);

    return { status: 200, message: theCar };
  }

  public async updateCar(id: string, car: ICar) {
    if (!isValidObjectId(id)) {
      return { status: 422, message: { message: 'Invalid mongo id' } };
    }

    const carModel = new CarModel();
    const theCar = await carModel.getOneById(id);

    if (!theCar) {
      return { status: 404, message: { message: 'Car not found' } };
    }
    
    await carModel.update(id, car);
    const updatedCar = await carModel.getOneById(id);
    const updatedCarFormatted = this.createCarDomain(updatedCar);

    return { status: 200, message: updatedCarFormatted };
  }
}
