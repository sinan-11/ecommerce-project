import express from 'express'
import { getAddress, saveAddress, getAllUsers, toggleBlockUser } from '../controllers/userController.js'
import { protect, adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/address', protect, getAddress)
router.put('/address', protect, saveAddress)


router.get('/', protect, adminOnly, getAllUsers)
router.put('/:id/block', protect, adminOnly, toggleBlockUser)

export default router