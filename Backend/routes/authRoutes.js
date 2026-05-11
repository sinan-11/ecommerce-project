import express from "express"

import {
  register,
  login,
  getMe,
  getAllUsers,
  toggleBlockUser
} from "../controllers/authController.js"

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js"

const router = express.Router()

// AUTH
router.post("/register", register)
router.post("/login", login)
router.get("/me", protect, getMe)

// ADMIN USERS
router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
)

router.put(
  "/users/:id/block",
  protect,
  adminOnly,
  toggleBlockUser
)

export default router