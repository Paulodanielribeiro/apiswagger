import { Router, Request, Response } from 'express'
import { Severity } from '../enums/Severity'
import { ProductController } from '../controllers/ProductController'
import { Product } from '../entity/Product'

export const productsRouter = Router()
const productCtrl = new ProductController()

productsRouter.post('/', async (req: Request, res: Response) => {
  const { description, deadline, severity } = req.body

  const errorMessages: string[] = []

  if (!description) {
    errorMessages.push('Description cannot be empty')
  }

  const deadlineDate = new Date(deadline)
  if (deadlineDate < new Date()) {
    errorMessages.push('Deadline cannot be a past date')
  }

  const severityNumber = Number(severity)
  if (
    isNaN(severityNumber) ||
    severityNumber < Severity.LOW ||
    severityNumber > Severity.HIGH
  ) {
    errorMessages.push('Invalid severity level')
  }

  if (errorMessages.length === 0) {
    const product = new Product()
    product.description = description
    const savedProduct = await productCtrl.save(product)
    return res.status(201).json({ product: savedProduct })
  }

  return res.status(400).json({ errorMessages })
})
