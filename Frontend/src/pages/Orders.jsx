import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getMyOrders, cancelOrder } from "../api/orders"

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const user  = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    getMyOrders()
      .then((res) => setOrders(res.data))
      .catch(() => toast.error("Failed to load orders"))
      .finally(() => setLoading(false))
  }, [])

  /* ── CANCEL ─────────────────────────────────────────────── */
  const cancelOrderHandler = (orderId) => {
    toast(
      <div className="text-sm">
        <p className="font-medium mb-3">
          Are you sure you want to cancel this order?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 border rounded text-xs hover:bg-zinc-50"
          >
            No
          </button>
          <button
            onClick={() => { toast.dismiss(); confirmCancel(orderId) }}
            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          >
            Yes, Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    )
  }

  const confirmCancel = (orderId) => {
    cancelOrder(orderId)
      .then(() => {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "Cancelled" } : o
          )
        )
        toast.success("Order cancelled")
      })
      .catch((err) =>
        toast.error(err.response?.data?.message || "Failed to cancel order")
      )
  }

  if (user.role === "admin") return <p className="p-6">Admin has no personal orders</p>
  if (loading) return <p className="p-6 text-gray-500">Loading orders...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 mb-6 bg-white shadow"
          >
            {/* Header */}
            <div className="flex justify-between mb-3">
              <div>
                <p className="font-semibold">Order ID: {order.orderId}</p>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <span
                  className={`font-semibold block ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-500"
                      : "text-blue-600"
                  }`}
                >
                  {order.status}
                </span>

                  {order.status !== "Delivered" &&
                   order.status !== "Cancelled" && (
                     <button
                       onClick={() => cancelOrderHandler(order._id)}
                       className="text-sm text-red-500 hover:underline mt-1"
                     >
                       Cancel Order
                     </button>
                   )}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="mt-4 text-sm text-gray-500 border-t pt-3">
              <p className="font-medium text-gray-700 mb-1">Delivery Address</p>
              <p>{order.address.name} · {order.address.phone}</p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state} – {order.address.pincode}</p>
            </div>

            {/* Total */}
            <div className="mt-4 flex justify-between font-semibold border-t pt-3">
              <p>Total</p>
              <p>₹{Number(order.total).toLocaleString("en-IN")}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Orders