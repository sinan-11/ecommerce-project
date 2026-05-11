import React, { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { getProductById } from "../api/products"
import { addToCart } from "../api/cart"

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [prod, setProd] = useState(null)
  const [mainImg, setMainImg] = useState("")
  const [selectedSize, setSelectedSize] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cartLoading, setCartLoading] = useState(false)

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProd(res.data)
        setMainImg(res.data.images?.[0])
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!prod) return <p className="text-center mt-10">Product not found</p>

  // 🔥 ADD TO CART
  async function addToCartHandler() {
    const token = localStorage.getItem("token")

    if (!token) {
      toast.error("Login first")
      navigate("/login", { state: { from: location.pathname } })
      return
    }

    if (!selectedSize) {
      toast.error("Select a size")
      return
    }

    const selected = prod.sizes.find(s => s.size === selectedSize)

    if (!selected || selected.stock === 0) {
      toast.error("Out of stock")
      return
    }

    setCartLoading(true)
    try {
      await addToCart({
        product: prod._id,
        name: prod.name,
        price: prod.price,
        image: prod.images[0],
        size: selectedSize,
        quantity: 1
      })

      toast.success("Added to cart! 🛒")
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart")
    } finally {
      setCartLoading(false)
    }
  }

  // 🔥 BUY NOW
  function orderHandler() {
    const token = localStorage.getItem("token")

    if (!token) {
      toast.error("Login first")
      navigate("/login", { state: { from: location.pathname } })
      return
    }

    if (!selectedSize) {
      toast.error("Select a size")
      return
    }

    const selected = prod.sizes.find(s => s.size === selectedSize)

    if (!selected || selected.stock === 0) {
      toast.error("Out of stock")
      return
    }

    navigate("/checkout", {
      state: {
        buyNow: {
          product: prod._id,
          name: prod.name,
          price: prod.price,
          image: prod.images[0],
          size: selectedSize,
          quantity: 1
        }
      }
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* LEFT: IMAGES */}
      <div>
        <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
          <img
            src={mainImg}
            alt={prod.name}
            className="w-full h-[420px] object-cover"
          />
        </div>

        <div className="flex gap-3">
          {prod.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumb"
              onClick={() => setMainImg(img)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border
                ${mainImg === img ? "border-black" : "border-gray-200"}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div>
        <p className="text-sm uppercase text-gray-400">{prod.category}</p>
        <h1 className="text-3xl font-bold mt-2">{prod.name}</h1>
        <p className="text-gray-600 mt-1">{prod.brand}</p>

        <p className="text-2xl font-semibold mt-4">
          ₹{Number(prod.price).toLocaleString("en-IN")}
        </p>

        <p className="text-gray-700 mt-6">{prod.description}</p>

        {/* SIZE */}
        <div className="mt-8">
          <p className="font-semibold mb-3">Select Size</p>

          <div className="flex gap-3 flex-wrap">
            {prod.sizes?.map((s) => (
              <button
                key={s.size}
                disabled={s.stock === 0}
                onClick={() => setSelectedSize(s.size)}
                className={`px-4 py-2 border rounded
                  ${selectedSize === s.size ? "bg-black text-white" : ""}
                  ${s.stock === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "hover:border-black"}
                `}
              >
                {s.size}
              </button>
            ))}
          </div>

          {!selectedSize && (
            <p className="text-red-500 mt-3 text-sm">
              Please select a size
            </p>
          )}

          {/* STOCK INFO */}
          {selectedSize && (
            <p className="text-sm mt-2 text-gray-600">
              Stock: {
                prod.sizes.find(s => s.size === selectedSize)?.stock
              }
            </p>
          )}
        </div>

        {/* ADD TO CART */}
        <button
          disabled={!selectedSize || cartLoading}
          onClick={addToCartHandler}
          className={`mt-8 w-full py-3 rounded-full font-semibold border-2 border-black transition
            ${selectedSize
              ? "bg-white text-black hover:bg-gray-100"
              : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"}
          `}
        >
          {cartLoading ? "Adding..." : "Add to Cart 🛒"}
        </button>

        {/* BUY NOW */}
        <button
          disabled={!selectedSize}
          onClick={orderHandler}
          className={`mt-3 w-full py-3 rounded-full font-semibold
            ${selectedSize
              ? "bg-black text-white"
              : "bg-gray-300 cursor-not-allowed"}
          `}
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default ProductDetails