import axios from "axios"

const BASE = "http://localhost:5000/api"

// AUTH HEADER
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})

/* ================= PRODUCTS ================= */

// GET ALL PRODUCTS
export const getProducts = () =>
  axios.get(`${BASE}/products`)

// CREATE PRODUCT
export const createProduct = (data) =>
  axios.post(
    `${BASE}/products`,
    data,
    authHeader()
  )

// UPDATE PRODUCT
export const updateProduct = (id, data) =>
  axios.put(
    `${BASE}/products/${id}`,
    data,
    authHeader()
  )

// DELETE PRODUCT
export const deleteProduct = (id) =>
  axios.delete(
    `${BASE}/products/${id}`,
    authHeader()
  )

/* ================= ORDERS ================= */

// GET ALL ORDERS
export const getAllOrders = () =>
  axios.get(
    `${BASE}/orders`,
    authHeader()
  )

// UPDATE ORDER STATUS
export const updateOrderStatus = (id, status) =>
  axios.put(
    `${BASE}/orders/${id}/status`,
    { status },
    authHeader()
  )

/* ================= USERS ================= */

// GET ALL USERS
export const getAllUsers = () =>
  axios.get(
    `${BASE}/auth/users`,
    authHeader()
  )

// BLOCK / UNBLOCK USER
export const toggleBlockUser = (id, blocked) =>
  axios.put(
    `${BASE}/auth/users/${id}/block`,
    { blocked },
    authHeader()
  )