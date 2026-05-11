import React, { useEffect, useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { getProducts, getAllUsers, getAllOrders } from "../../api/admin"

const COLORS = ["#18181b", "#6366f1", "#10b981", "#f59e0b", "#ef4444"]

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getProducts(),
      getAllUsers(),
      getAllOrders()
    ])
      .then(([prodRes, userRes, orderRes]) => {
        setProducts(prodRes.data.products)
        setUsers(userRes.data)

        const allOrders = orderRes.data.map(order => ({
          ...order,
          userName: order.user?.name || 'Unknown'
        }))

        setOrders(allOrders)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
          <p className="text-zinc-400 text-xs tracking-widest uppercase font-medium">
            Loading dashboard
          </p>
        </div>
      </div>
    )
  }

  /* ===== STATS ===== */
 const totalRevenue = orders
  .filter(o => o.status === "Delivered")
  .reduce((sum, o) => sum + (o.total || 0), 0)

  /* ===== PIE DATA ===== */
  const statusMap = {}
  orders.forEach(o => {
    statusMap[o.status] = (statusMap[o.status] || 0) + 1
  })

  const statusData = Object.keys(statusMap).map(key => ({
    name: key,
    value: statusMap[key]
  }))

  /* ===== TOP PRODUCTS ===== */
  const productMap = {}
  orders.forEach(o => {
    o.items.forEach(item => {
      productMap[item.name] =
        (productMap[item.name] || 0) + item.quantity
    })
  })

  const topProducts = Object.entries(productMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5)

  const maxQty = topProducts[0]?.qty || 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* HEADER */}
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-[0.25em] font-medium mb-2">
            Overview
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight">
            Admin Dashboard
          </h1>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Products" value={products.length} />
          <StatCard title="Users" value={users.length} />
          <StatCard
        title="Orders"
          value={orders.filter(order => order.status !== "Cancelled").length}
      />
          <StatCard
            title="Revenue"
            value={`₹ ${totalRevenue.toLocaleString("en-IN")}`}
          />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PIE */}
          <div className="relative bg-white/80 backdrop-blur border border-zinc-200 rounded-3xl p-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-amber-500 rounded-t-3xl" />
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
              Distribution
            </p>
            <h2 className="text-sm font-semibold text-zinc-900 mb-6">
              Order Status
            </h2>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={105}
                  paddingAngle={4}
                  label={({ percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "14px",
                    border: "1px solid #e4e4e7",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                    fontSize: "12px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* TOP PRODUCTS */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 shadow-sm">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
              Analytics
            </p>
            <h2 className="text-sm font-semibold text-zinc-900 mb-6">
              Top Selling Products
            </h2>

            <ul className="space-y-5">
              {topProducts.map((p, i) => (
                <li key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-700 font-medium">
                      {p.name}
                    </span>
                    <span className="text-zinc-900 font-semibold">
                      {p.qty}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-zinc-900 to-zinc-700 rounded-full transition-all duration-500"
                      style={{ width: `${(p.qty / maxQty) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RECENT ORDERS */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 shadow-sm">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">
              Latest
            </p>
            <h2 className="text-sm font-semibold text-zinc-900 mb-6">
              Recent Orders
            </h2>

            <ul className="divide-y divide-zinc-100">
              {orders.slice(0, 5).map(o => (
                <li key={o.orderId} className="py-4 flex justify-between">
                  <div>
                    <p className="text-[13px] font-mono text-zinc-500">
                      #{o.orderId}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {o.userName}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-zinc-900">
                    ₹{o.total}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  )
}

/* ===== STAT CARD ===== */
function StatCard({ title, value }) {
  return (
    <div className="relative bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-zinc-900 to-zinc-600" />
      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
        {title}
      </p>
      <p className="text-2xl font-bold text-zinc-900 mt-2">
        {value}
      </p>
    </div>
  )
}

export default AdminDashboard