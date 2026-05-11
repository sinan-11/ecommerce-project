import api from "./axios"

export const getAddress = () => api.get("/api/user/address")
export const saveAddress = (data) => api.put("/api/user/address", data)
