import express from 'express'
import { getProduct,getProductById,updateProduct,createProduct,deleteProduct } from '../controllers/productController.js'
import { protect,adminOnly } from '../middleware/authMiddleware.js'


const router=express.Router()

router.get('/',getProduct)
router.get('/:id',getProductById)

router.post('/',protect,adminOnly,createProduct)
router.put('/:id',protect,adminOnly,updateProduct)
router.delete('/:id',protect,adminOnly,deleteProduct)



export default router