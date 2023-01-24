import { NextFunction, Request, Response } from 'express';

import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcyclesController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle = { ...this.req.body };
    const newMotorcycle = await this.service.createMotorcycle(motorcycle);

    return this.res.status(201).json(newMotorcycle);
  }

  public async getAll() {
    const result = await this.service.getMotorcycles();

    return this.res.status(result.status).json(result.message);
  }

  public async getById() {
    const { id } = this.req.params;
    const result = await this.service.getMotorcycleById(id);

    return this.res.status(result.status).json(result.message);
  }

  public async update() {
    const { id } = this.req.params;
    const motorcycle = { ...this.req.body };
    
    const result = await this.service.updateMotorcycle(id, motorcycle);

    return this.res.status(result.status).json(result.message);
  }
}
