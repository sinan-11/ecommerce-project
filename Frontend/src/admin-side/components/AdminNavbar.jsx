import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import logo from "../../assets/logo.png.png"

function AdminNavbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
    navigate("/login", { replace: true })
  }

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "bg-gray-900 text-white shadow-sm"
         : "text-gray-700 hover:bg-gray-200/70 hover:text-gray-900"
     }`

  return (
    <div className="sticky top-4 z-50 px-4">
      <header className="max-w-7xl mx-auto bg-gray-50/90 backdrop-blur rounded-2xl shadow-xl border border-gray-200">

        <div className="px-6 py-4 flex items-center justify-between">

          {/* Logo + Title */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              <img
                src={logo}
                alt="Admin Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">
              Admin Panel
            </h2>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/admin/products"  className={linkClass}>Products</NavLink>
            <NavLink to="/admin/orders"    className={linkClass}>Orders</NavLink>
            <NavLink to="/admin/users"     className={linkClass}>Users</NavLink>

            <button
              onClick={handleLogout}
              className="ml-3 px-4 py-2 text-sm font-medium rounded-full
                         text-red-500 hover:bg-red-100/60 transition"
            >
              Logout
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center
                       rounded-xl hover:bg-gray-200/70 transition"
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-6 bg-gray-900 transition ${open && "rotate-45 translate-y-1.5"}`} />
              <span className={`block h-0.5 w-6 bg-gray-900 transition ${open && "opacity-0"}`} />
              <span className={`block h-0.5 w-6 bg-gray-900 transition ${open && "-rotate-45 -translate-y-1.5"}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-6 pb-6 pt-3 space-y-2 border-t border-gray-200 bg-gray-50/90">
            <NavLink onClick={() => setOpen(false)} to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/admin/products"  className={linkClass}>Products</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/admin/orders"    className={linkClass}>Orders</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/admin/users"     className={linkClass}>Users</NavLink>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-full text-sm font-medium
                         text-red-500 hover:bg-red-100/60"
            >
              Logout
            </button>
          </div>
        )}

      </header>
    </div>
  )
}

export default AdminNavbar