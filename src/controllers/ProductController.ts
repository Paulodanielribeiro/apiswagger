import { Repository, UpdateResult, getRepository } from 'typeorm';
import { Product } from '../entity/Product';
import { Request, Response } from 'express';

export class ProductController {
  private _repo: Repository<Product>;

  constructor() {
    this._repo = getRepository(Product);
  }

  async save(product: Product): Promise<Product> {
    const savedProduct: Product = await this._repo.save(product);
    return savedProduct;
  }

  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = await this._repo.find();
    return products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const product: Product | undefined = await this._repo.findOne({ where: { id } });
    return product;
  }

  async getProductByDescription(description: string): Promise<Product | undefined> {
    const product: Product | undefined = await this._repo.findOne({ where: { description } });
    return product;
  }
}

const productController = new ProductController();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body as Product;
    const savedProduct = await productController.save(product);
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productController.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await productController.getProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductByDescription = async (req: Request, res: Response) => {
  try {
    const productDescription = req.params.description;
    const product = await productController.getProductByDescription(productDescription);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
