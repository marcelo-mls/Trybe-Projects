import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IProduct } from '../utils/interfaces';
import mysql from './connection';

class ProductModel {
  private connection = mysql;

  public async insertProduct(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;

    const [result] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Products (name, amount)
      VALUES (?, ?)`,
      [name, amount],
    );

    const { insertId } = result;

    return { id: insertId, ...product };
  }

  public async selectAll(): Promise<IProduct[]> {
    const [result] = await this.connection.execute<IProduct[] & RowDataPacket[]>(
      `SELECT *
      FROM Trybesmith.Products`,
    );
    
    return result;
  }
}

export default ProductModel;
