import { Router, Request, Response } from 'express';
import { ProductController } from '../controllers/ProductController';
import { Product } from '../entity/Product';

export const productsRouter = Router();
const productCtrl = new ProductController();

productsRouter.post('/', async (req: Request, res: Response) => {
  const { description } = req.body;

  const errorMessages: string[] = [];

  if (!description) {
    errorMessages.push('Description cannot be empty');
  }

  if (errorMessages.length === 0) {
    const product = new Product();
    product.description = description;
    const savedProduct = await productCtrl.save(product);
    return res.status(201).json({ product: savedProduct });
  }

  return res.status(400).json({ errorMessages });
});
