import express from 'express';
import ProductController from './product.controller.js';

import { upload } from '../../middlewares/fileupload.middleware.js';


const productController = new ProductController();
const productRouter = express.Router();

//localhost:3200/api/products/filter?minPrice=10&maxPrice=20
//http://localhost:3200/api/products/rate?userId=1&productId=1&rating=4
productRouter.post('/rate', productController.rateProduct);
productRouter.get('/filter', productController.filterProduct);

productRouter.get('/', productController.getAllProducts);
productRouter.post('/',upload.single('imageUrl'), productController.addProduct);
productRouter.get('/averagePrice', productController.averagePrice);
productRouter.get('/:id', productController.getOneProduct);

//http://localhost:3200/api/products/:id


export default productRouter;