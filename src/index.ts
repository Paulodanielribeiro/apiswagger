import { AppDataSource } from "./data-source"
import { Product } from "./entity/Product" 

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new product into the database...")
    const product = new Product() 
    product.price = 100.00
    product.description = "This is an example product"
    await AppDataSource.manager.save(product) 
    console.log("Saved a new product with id: " + product.id)

    console.log("Loading products from the database...")
    const products = await AppDataSource.manager.find(Product) 
    console.log("Loaded products: ", products)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))