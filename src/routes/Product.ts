import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { Product } from '../entity/Product';

export const productsRouter = Router();
const productCtrl = new ProductController();

const errorMessages: string[] = [];

productsRouter.post('/products', async (req, res) => {
  try {
    const { description, price, quantity } = req.body;

    

    if (!description || !price || !quantity) {
      return res.status(400).json({messages:'Invalid inputs'});
    }

    if (errorMessages.length === 0) {
      const product = new Product();
      product.description = description;
      product.price = price;
      product.quantity = quantity;
     const savedProduct = await productCtrl.createProduct(product); // Calling the createProduct method with req and res
      return res.status(201).json({ task:savedProduct,message: 'Product registered' });
    }

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

productsRouter.get('/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await productCtrl.getProductById(id); // Calling the getProductById method with req, res, and productId

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

productsRouter.get('/products/description/:description', async (req, res) => {
  try {
    const productDescription = req.params.description;
    const products = await productCtrl.getProductByDescription(description); // Calling the getProductByDescription method with req, res, and productDescription

    return res.status(200).json({products});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
