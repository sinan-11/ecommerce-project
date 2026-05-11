import { createContext, useEffect, useState } from "react"
import { getProducts } from "../api/products"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load products")
        setLoading(false)
      })
  }, [])

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  )
}