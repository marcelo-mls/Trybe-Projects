import { RowDataPacket } from 'mysql2';
import { IOrder } from '../utils/interfaces';
import mysql from './connection';

class OrderModel {
  private connection = mysql;

  public async selectAll(): Promise<IOrder[]> {
    const [result] = await this.connection.execute<IOrder[] & RowDataPacket[]>(
      `SELECT
        orders.id
        , userId
        , JSON_ARRAYAGG(products.id) productsIds
      FROM Trybesmith.Orders orders
      JOIN Trybesmith.Products products ON products.orderId = orders.id
      GROUP BY 1`,
    );

    return result;
  }
}

export default OrderModel;
