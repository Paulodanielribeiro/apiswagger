import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import { productsRouter } from './routes/Product' // Importando o roteador de produtos
import { swaggerOptions } from './config/swagger'
import './data-source'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/products', productsRouter) // Usando o roteador de produtos

const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
app.get('/', (req, res) => res.send('Products API')) // Alterando a mensagem para 'Products API'