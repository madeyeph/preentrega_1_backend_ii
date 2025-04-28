import { Router } from 'express'
import { ProductsController } from '../controllers/products.controllers.js'

export const router = Router()
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct

} = new ProductsController ()

router.get("/", getProducts)
router.post('/', createProduct)
router.get('/:pid', getProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)