import { ProductsManager } from '../dao/ProductManager.js'
import { productsModel } from '../dao/models/productsmodels.js'
import { productsService } from '../services/index.js'
import { procesaErrores } from '../utils.js'

export class ProductsController{
    constructor(){
        this.service = productsService

    }

    createProduct = async (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      const { title, description, price, code, stock, status } = req.body
    
      if (!title || !description || !price || !code || !stock) {
          return res.status(400).json({ error: `Todos los campos son requeridos` })
      }
    
      try {
          const existe = await ProductsManager.getProductBy({ code })
          if (existe) {
              return res.status(400).json({ error: `Producto repetido con código ${code}` })
          }
    
          const ultimoProducto = await productsModel.findOne().sort({ id: -1 }).limit(1)
          const nuevoId = ultimoProducto ? ultimoProducto.id + 1 : 1
    
          const newProduct = await this.service.createProduct(req.body)
    
          if (newProduct && newProduct.code === 500) {
              return procesaErrores({ message: newProduct.error }, res)
          }
    
          return res.status(201).json({ payload: 'Producto creado!', newProduct })
      } catch (error) {
          procesaErrores(error, res)
      }
    } 

    getProducts = async (req, res) => {
      try {
        const products = await this.service.getProducts()
        const plainProducts = products.map((product) => product.toObject())
        res.setHeader("Content-Type", "application/json")
        res.status(200).json({ products: plainProducts })
      } catch (error) {
        procesaErrores(error, res)
      }
    
    }

    getProduct = async (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      const pid = req.params.pid
    
      try {
          const result = await this.service.getProduct()
    
          if (result && result.code === 500) {
              return procesaErrores({ message: result.error }, res)
          }
    
          if (result && result.code === 404) {
              return res.status(404).json({ error: result.error })
          }
    
          return res.status(200).json({ product: result })
      } catch (error) {
          console.error("Router getProductById: Error en la ejecución:", error)
          procesaErrores(error, res)
      }
    }

    updateProduct = async (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      const pid = req.params.pid
    
      try {
          const result = await this.service.updateProduct(req.params.pid, req.body, )
    
          if (result && result.code === 500) {
              return procesaErrores({ message: result.error }, res)
          }
    
          if (result && result.code === 404) {
              return res.status(404).json({ error: result.error })
          }
    
          return res.status(200).json({
              message: `Producto con ID ${pid} actualizado`,
              productoActualizado: result.product
          })
      } catch (error) {
          procesaErrores(error, res)
      }
    }

    deleteProduct = async (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      const pid = req.params.pid
    
      try {
          const result = await this.service.deleteProduct(req.params, )
    
          if (result && result.code === 500) {
              return procesaErrores({ message: result.error }, res)
          }
    
          if (result && result.code === 404) {
              return res.status(404).json({ error: result.error })
          }
    
          return res.status(200).json({
              message: `Producto con ID personalizado ${pid} eliminado`,
              deletedProduct: result.product
          })
      } catch (error) {
          procesaErrores(error, res)
      }
    }


}