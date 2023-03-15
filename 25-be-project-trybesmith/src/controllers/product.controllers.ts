import { Request, Response } from 'express';
import statusCodes from '../utils/errorMap';
import ProductService from '../services/product.services';

class ProductController {
  public productService = new ProductService();

  public async insertProduct(req: Request, res: Response) {
    const product = req.body;
    const result = await this.productService.insertProduct(product);

    res.status(statusCodes.CREATED).json(result);
  }

  public async selectAll(_req: Request, res: Response) {
    const result = await this.productService.selectAll();

    res.status(statusCodes.OK).json(result);
  }
}

export default ProductController;
