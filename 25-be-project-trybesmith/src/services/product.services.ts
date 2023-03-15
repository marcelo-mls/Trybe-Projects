import ProductModel from '../models/product.model';
import { IProduct } from '../utils/interfaces';

class ProductService {
  public product = new ProductModel();

  public async insertProduct(product: IProduct): Promise<IProduct> {
    const result = await this.product.insertProduct(product);
    return result;
  }

  public async selectAll(): Promise<IProduct[]> {
    const result = await this.product.selectAll();
    return result;
  }
}

export default ProductService;
