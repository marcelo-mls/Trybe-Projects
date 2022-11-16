import { Router } from 'express';
import ProductController from '../controllers/product.controllers';
import UserController from '../controllers/user.controllers';
import OrderController from '../controllers/order.controllers';

const router = Router();

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

router.post('/products', productController.insertProduct.bind(productController));
router.get('/products', productController.selectAll.bind(productController));
router.post('/users', userController.insertUser.bind(userController));
router.get('/orders', orderController.getAll.bind(orderController));

export default router;