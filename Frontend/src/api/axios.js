import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Attach token automatically
instance.interceptors.request.use(config => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Global error handling
instance.interceptors.response.use(
  res => res,

  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      window.location.href = "/login"
    }

    return Promise.reject(err)
  }
)

export default instance