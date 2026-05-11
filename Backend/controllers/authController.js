import jwt from "jsonwebtoken"
import User from "../models/User.js"

// GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}

/* ================= REGISTER ================= */

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      })
    }

    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({
        message: "Email already in use"
      })
    }

    const user = await User.create({
      name,
      email,
      password
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/* ================= LOGIN ================= */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required"
      })
    }

    const user = await User.findOne({ email })

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    // BLOCKED USER
    if (user.blocked) {
      return res.status(403).json({
        message: "User has been blocked"
      })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/* ================= GET LOGGED USER ================= */

export const getMe = async (req, res) => {
  try {
    res.json(req.user)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/* ================= ADMIN: GET ALL USERS ================= */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")

    res.json(users)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

/* ================= ADMIN: BLOCK / UNBLOCK USER ================= */

export const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    user.blocked = req.body.blocked

    await user.save()

    res.json({
      message: `User ${
        user.blocked ? "blocked" : "unblocked"
      } successfully`
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}