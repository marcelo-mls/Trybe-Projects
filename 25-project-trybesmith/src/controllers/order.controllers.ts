import { Request, Response } from 'express';
import statusCodes from '../utils/errorMap';
import OrderService from '../services/order.services';

class OrderController {
  public orderService = new OrderService();

  public async getAll(_req: Request, res: Response) {
    const result = await this.orderService.selectAll();
    
    res.status(statusCodes.OK).json(result);
  }
}

export default OrderController;
