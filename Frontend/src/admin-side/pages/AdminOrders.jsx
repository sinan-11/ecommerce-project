import React, { useEffect, useState } from "react"
import { getAllOrders, updateOrderStatus } from "../../api/admin"

/* ===== STATUS CONFIG ===== */

const STATUS_OPTIONS = [
  "Pending",
  "Shipped",
  "Delivered",
  "Cancelled"
]

const STATUS_STYLES = {
  "Pending": "bg-sky-50 text-sky-600 border-sky-200",
  "Shipped": "bg-violet-50 text-violet-600 border-violet-200",
  "Delivered": "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Cancelled": "bg-red-50 text-red-500 border-red-200",
}

const STATUS_BORDER = {
  "Pending": "border-l-sky-400",
  "Shipped": "border-l-violet-400",
  "Delivered": "border-l-emerald-400",
  "Cancelled": "border-l-red-400",
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllOrders()
      .then(res => {
        const formattedOrders = res.data.map(order => ({
          ...order,
          userName: order.user?.name || 'Unknown'
        }))
        setOrders(formattedOrders.reverse())
      })
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = (orderId, status) => {
    updateOrderStatus(orderId, status)
      .then(() => {
        setOrders(prev =>
          prev.map(o =>
            o._id === orderId ? { ...o, status } : o
          )
        )
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 md:px-14 py-10 md:py-20">

      {/* HEADER */}
      <div className="flex justify-between items-end mb-8 md:mb-12">
        <div>
          <p className="text-xs uppercase text-zinc-400 tracking-widest mb-2">
            Order Management
          </p>
          <h1 className="text-2xl md:text-4xl font-semibold">
            All Orders
          </h1>
        </div>
        <span className="text-sm text-zinc-400">
          {orders.length} orders
        </span>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block space-y-5">
        <div className="grid grid-cols-[1.1fr_1.4fr_3fr_1fr_1.5fr] px-9 py-5 bg-white border rounded-2xl">
          {["Order", "Customer", "Items", "Total", "Status"].map(h => (
            <span key={h} className="text-xs uppercase text-zinc-400 font-semibold">
              {h}
            </span>
          ))}
        </div>

        {orders.map(order => (
          <div
            key={order.orderId}
            className={`grid grid-cols-[1.1fr_1.4fr_3fr_1fr_1.5fr]
              px-9 py-8 bg-white rounded-2xl border border-l-4
              ${STATUS_BORDER[order.status]} hover:shadow-lg transition`}
          >
             <div>
              <p className="font-mono text-sm">#{order.orderId}</p>
              <p className="text-xs text-zinc-400">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <p className="font-medium">{order.userName}</p>

            <div className="flex flex-wrap gap-2">
              {order.items.map((i, idx) => (
                <img key={idx} src={i.image} alt=""
                  className="w-9 h-9 rounded-full border" />
              ))}
            </div>

            <p className="font-semibold">₹{order.total}</p>

             <select
              value={order.status}
              onChange={e =>
                updateStatus(order._id, e.target.value)
              }
              className={`px-4 py-2 rounded-full border text-sm ${STATUS_STYLES[order.status]}`}
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {orders.map(order => (
          <div
            key={order.orderId}
            className={`bg-white rounded-xl p-4 border-l-4 ${STATUS_BORDER[order.status]}`}
          >
            <div className="flex justify-between mb-2">
              <p className="font-mono text-sm">#{order.orderId}</p>
              <p className="text-sm font-semibold">₹{order.total}</p>
            </div>

            <p className="text-sm mb-2">
              <span className="text-zinc-400">Customer:</span> {order.userName}
            </p>

            <div className="flex gap-2 mb-3 overflow-x-auto">
              {order.items.map((i, idx) => (
                <img key={idx} src={i.image} alt=""
                  className="w-12 h-12 rounded-lg border" />
              ))}
            </div>

             <select
              value={order.status}
              onChange={e =>
                updateStatus(order._id, e.target.value)
              }
              className={`w-full px-4 py-2 rounded-lg border ${STATUS_STYLES[order.status]}`}
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <p className="text-center text-zinc-400 mt-20">
          No orders yet
        </p>
      )}
    </div>
  )
}

export default AdminOrders