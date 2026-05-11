import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { getCart, clearCart } from "../api/cart"
import { placeOrder } from "../api/orders"
import { getAddress, saveAddress } from "../api/user"

const EMPTY_ADDRESS = { name: "", phone: "", street: "", city: "", state: "", pincode: "" }

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.querySelector('script[src*="razorpay"]')) { resolve(true); return }
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

function Checkout() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const buyNowItem = location.state?.buyNow || null

  const [cart, setCart]                   = useState([])
  const [loadingCart, setLoadingCart]     = useState(true)
  const [placing, setPlacing]             = useState(false)
  const [address, setAddress]             = useState(EMPTY_ADDRESS)
  const [paymentMethod, setPaymentMethod] = useState("COD")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { navigate("/login"); return }

    if (buyNowItem) {
      setCart([buyNowItem])
      getAddress()
        .then((res) => { if (res.data?.name) setAddress(res.data) })
        .catch(() => {})
        .finally(() => setLoadingCart(false))
      return
    }

    Promise.all([getCart(), getAddress()])
      .then(([cartRes, addrRes]) => {
        setCart(cartRes.data.items || [])
        if (addrRes.data?.name) setAddress(addrRes.data)
      })
      .catch(() => toast.error("Failed to load data"))
      .finally(() => setLoadingCart(false))
  }, [])

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount   = cart.reduce((sum, i) => sum + i.quantity, 0)

  const handleAddress = (e) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  // ── Validation (shared) ──────────────────────────────────
  const validate = () => {
    if (cart.length === 0)            { toast.error("Cart is empty");                return false }
    for (let key in address) {
      if (!address[key])              { toast.error("Fill all address fields");      return false }
    }
    if (address.phone.length !== 10)  { toast.error("Enter valid 10-digit phone");   return false }
    if (address.pincode.length !== 6) { toast.error("Enter valid 6-digit pincode");  return false }
    return true
  }

  // ── Shared: save address + build order payload ───────────
  const buildOrderPayload = (extraFields = {}) => ({
    items: cart.map((item) => ({
      product:  item.product,
      name:     item.name,
      price:    item.price,
      image:    item.image,
      size:     item.size,
      quantity: item.quantity,
    })),
    total:         totalAmount,
    address,
    paymentMethod,
    ...extraFields,
  })

  const postOrderSuccess = async () => {
    if (!buyNowItem) await clearCart()
    toast.success("Order placed successfully 🎉")
    navigate("/orders")
  }

  // ── COD flow ─────────────────────────────────────────────
  const handleCOD = async () => {
    await saveAddress(address)
    await placeOrder(buildOrderPayload())
    await postOrderSuccess()
  }

  // ── Razorpay flow ────────────────────────────────────────
  const handleRazorpay = async () => {
    console.log("API URL:", import.meta.env.VITE_API_URL)
  console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID)
    const loaded = await loadRazorpayScript()
    if (!loaded) { toast.error("Failed to load Razorpay. Check your connection."); return }

    await saveAddress(address)

    // 1. Create order on backend
    const token = localStorage.getItem("token")
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body:    JSON.stringify({ amount: totalAmount }),
    })
    const { order } = await res.json()

    // 2. Open Razorpay checkout
    const options = {
      key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:      order.amount,
      currency:    order.currency,
      name:        "Your Store Name",
      description: "Order Payment",
      order_id:    order.id,

      handler: async (response) => {
        // 3. Verify on backend
        const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify-payment`, {
          method:  "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body:    JSON.stringify(response),
        })
        const { success } = await verifyRes.json()

        if (success) {
          // 4. Save order in your DB with payment details
          await placeOrder(buildOrderPayload({
            razorpayOrderId:   response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
          }))
          await postOrderSuccess()
        } else {
          toast.error("Payment verification failed")
        }
      },

      prefill: {
        name:    address.name,
        contact: address.phone,
      },

      theme: { color: "#000000" },
    }

    const rzp = new window.Razorpay(options)
    rzp.on("payment.failed", (r) => {
      toast.error("Payment failed: " + r.error.description)
    })
    rzp.open()
  }

  // ── Main submit ──────────────────────────────────────────
  const placeOrderHandler = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setPlacing(true)
    try {
      if (paymentMethod === "Razorpay") {
        await handleRazorpay()
      } else {
        await handleCOD()
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed")
    } finally {
      setPlacing(false)
    }
  }

  if (loadingCart) return <p className="text-center mt-10 text-gray-500">Loading...</p>

  if (cart.length === 0) return (
    <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
      Your cart is empty
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold mb-2">Checkout</h1>

        {buyNowItem && (
          <p className="text-sm text-gray-500 mb-6">Buying directly — cart not affected</p>
        )}

        <form onSubmit={placeOrderHandler}>

          {/* Address */}
          <h2 className="text-sm font-medium mb-2">Delivery Address</h2>
          <input
            name="name" placeholder="Full Name" value={address.name}
            onChange={handleAddress} className="w-full mb-3 p-3 border rounded"
          />
          <input
            name="phone" placeholder="Phone Number" value={address.phone} maxLength={10}
            onChange={(e) => setAddress((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, "") }))}
            className="w-full mb-3 p-3 border rounded"
          />
          <input
            name="street" placeholder="Street Address" value={address.street}
            onChange={handleAddress} className="w-full mb-3 p-3 border rounded"
          />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input name="city"  placeholder="City"  value={address.city}  onChange={handleAddress} className="p-3 border rounded" />
            <input name="state" placeholder="State" value={address.state} onChange={handleAddress} className="p-3 border rounded" />
          </div>
          <input
            name="pincode" placeholder="Pincode" value={address.pincode} maxLength={6}
            onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, "") }))}
            className="w-full mb-6 p-3 border rounded"
          />

          {/* Payment */}
          <h2 className="text-sm font-medium mb-2">Payment Method</h2>
          <div className="mb-6 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="payment" value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="payment" value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={() => setPaymentMethod("Razorpay")}
              />
              Pay Online (Razorpay — UPI, Cards, Netbanking)
            </label>
          </div>

          {/* Order Summary */}
          <div className="mb-6 text-sm border rounded p-4 bg-white space-y-1">
            <p className="font-medium mb-2">Order Summary</p>
            {cart.map((item, i) => (
              <div key={item._id || i} className="flex justify-between text-gray-600">
                <span>{item.name} × {item.quantity} (Size {item.size})</span>
                <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>Total ({itemCount} items)</span>
              <span>₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            type="submit" disabled={placing}
            className="w-full bg-black text-white py-3 rounded disabled:opacity-60"
          >
            {placing
              ? "Processing..."
              : paymentMethod === "Razorpay"
              ? `Pay ₹${totalAmount.toLocaleString("en-IN")}`
              : "Place Order"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Checkout