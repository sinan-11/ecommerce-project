import api from "./axios"

export const getCart = () => api.get("/api/cart")
export const addToCart = (data) => api.post("/api/cart", data)
export const removeFromCart = (itemId) => api.delete(`/api/cart/${itemId}`)
export const clearCart = () => api.delete("/api/cart")
