import express from 'express'
import { protect,adminOnly } from '../middleware/authMiddleware.js'

import { placeOrder,getMyOrders,getOrderById,cancelOrder,getAllOrders,updateOrderStatus } from '../controllers/orderController.js'



const router=express.Router()
router.post("/", protect, placeOrder)
router.get("/my", protect, getMyOrders)
router.get("/:id", protect, getOrderById)
router.put("/:id/cancel", protect, cancelOrder)


router.get("/", protect, adminOnly, getAllOrders)
router.put("/:id/status", protect, adminOnly, updateOrderStatus)

export default router

