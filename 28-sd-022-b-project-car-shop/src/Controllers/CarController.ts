import { NextFunction, Request, Response } from 'express';

import CarService from '../Services/CarService';

export default class CarsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car = { ...this.req.body };
    const newCar = await this.service.createCar(car);

    return this.res.status(201).json(newCar);
  }

  public async getAll() {
    const result = await this.service.getCars();

    return this.res.status(result.status).json(result.message);
  }

  public async getById() {
    const { id } = this.req.params;
    const result = await this.service.getCarById(id);

    return this.res.status(result.status).json(result.message);
  }

  public async update() {
    const { id } = this.req.params;
    const car = { ...this.req.body };
    
    const result = await this.service.updateCar(id, car);

    return this.res.status(result.status).json(result.message);
  }
}
