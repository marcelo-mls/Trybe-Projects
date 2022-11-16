import OrderModel from '../models/order.model';
import { IOrder } from '../utils/interfaces';

class OrderService {
  public order = new OrderModel();

  public async selectAll(): Promise<IOrder[]> {
    const result = await this.order.selectAll();

    return result;
  }
}

export default OrderService;
