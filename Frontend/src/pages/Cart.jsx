import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getCart, removeFromCart } from "../api/cart"

function Cart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login")
      return
    }

    getCart()
      .then((res) => setCart(res.data.items || []))
      .catch((err) => {
        toast.error("Failed to load cart")
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  const removeItem = async (itemId) => {
    try {
      const res = await removeFromCart(itemId)
      setCart(res.data.items || [])
      toast.success("Item removed")
    } catch (err) {
      toast.error("Failed to remove item")
    }
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (loading) return (
    <p className="text-center mt-10 text-gray-500">Loading cart...</p>
  )

  if (cart.length === 0) return (
    <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
      Your cart is empty
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      {cart.map((item) => (
        <div key={item._id} className="flex gap-5 border-b pb-6 mb-6">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-28 rounded object-cover"
          />
          <div className="flex-1">
            <h2 className="font-medium">{item.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Size {item.size} · Qty {item.quantity}
            </p>
            <p className="mt-1 font-semibold">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={() => removeItem(item._id)}
            className="text-sm text-red-500 hover:underline self-start mt-1"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-semibold">
          Total: ₹{totalAmount.toLocaleString("en-IN")}
        </h2>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart