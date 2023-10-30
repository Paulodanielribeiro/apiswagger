// Importando as dependências necessárias
import { Repository, UpdateResult } from 'typeorm'
import { Product } from '../entity/Product'
import { AppDataSource } from '../data-source'

// Definindo a classe do controlador do produto
export class ProductController {
  // Variável privada para armazenar o repositório do produto
  private _repo: Repository<Product>

  // Construtor para inicializar o repositório do produto
  constructor() {
    this._repo = AppDataSource.getRepository(Product)
  }

  // Método para salvar um produto no banco de dados
  async save(product: Product): Promise<Product> {
    const savedProduct: Product = await this._repo.save(product)
    return savedProduct
  }

  // Método para encontrar produtos que ainda não foram realizados
  async findProductsToBePerformed(): Promise<Product[]> {
    const products: Product[] = await this._repo.find({
      where: {
        performed: false,
      },
      order: {
        severity: 'DESC',
      },
    })

    return products
  }

  // Método para marcar um produto como realizado
  async setProductAsPerformed(id: number): Promise<UpdateResult> {
    const result: UpdateResult = await this._repo.update(id, { performed: true })
    return result
  }
}
