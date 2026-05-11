import React, { useEffect, useState, useRef } from "react"
import Logo from "../assets/logo.png.png"
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import {
  FiUser, FiLogOut, FiPackage,
  FiMenu, FiArrowRight, FiShoppingCart
} from "react-icons/fi"
import { MdOutlinePersonOutline } from "react-icons/md"
import { toast } from "react-toastify"
import { getCart } from "../api/cart"

function Navbar() {
  const [visible, setVisible]         = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [count, setCount]             = useState(0)
  const [scrolled, setScrolled]       = useState(false)
  const [user, setUser]               = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null") }
    catch { return null }
  })
  const [token, setToken]             = useState(localStorage.getItem("token"))
  const dropdownRef                   = useRef(null)

  const navigate  = useNavigate()
  const location  = useLocation()
  const isAdmin   = user?.role === "admin"

  // re-read localStorage on every route change
  useEffect(() => {
    try {
      const storedUser  = JSON.parse(localStorage.getItem("user") || "null")
      const storedToken = localStorage.getItem("token")
      setUser(storedUser)
      setToken(storedToken)
    } catch {
      setUser(null)
      setToken(null)
    }
  }, [location.pathname])

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // fetch cart count — skip for admin
  useEffect(() => {
    if (!token || isAdmin) { setCount(0); return }
    getCart()
      .then((res) => {
        const items = res.data.items || []
        const total = items.reduce((sum, item) => sum + item.quantity, 0)
        setCount(total)
      })
      .catch(() => setCount(0))
  }, [location.pathname, token])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setToken(null)
    setShowProfile(false)
    setCount(0)
    toast.success("Logged out successfully")
    navigate("/", { replace: true })
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-[999] px-3 sm:px-10">
        <div
          className={`
            mt-4 flex items-center justify-between px-5 py-3
            rounded-2xl transition-all duration-300
            ${scrolled
              ? "bg-white/70 backdrop-blur-xl shadow-lg border border-gray-200"
              : "bg-white shadow-md"
            }
          `}
        >
          {/* LOGO */}
          <NavLink to={isAdmin ? "/admin/dashboard" : "/"} className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-28" />
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden sm:flex gap-8 text-sm font-medium text-gray-700">
            {isAdmin ? (
              <>
                {[
                  { path: "/admin/dashboard", label: "DASHBOARD" },
                  { path: "/admin/products",  label: "PRODUCTS"  },
                  { path: "/admin/orders",    label: "ORDERS"    },
                  { path: "/admin/users",     label: "USERS"     },
                ].map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative hover:text-black transition ${
                        isActive ? "text-black after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-black" : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </>
            ) : (
              [
                { path: "/",            label: "HOME"        },
                { path: "/collections", label: "COLLECTIONS" },
                { path: "/about",       label: "ABOUT"       },
                { path: "/contact",     label: "CONTACT"     },
              ].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative hover:text-black transition ${
                      isActive ? "text-black after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:bg-black" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))
            )}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            {!user ? (
              <NavLink to="/login">
                <FiUser size={22} />
              </NavLink>
            ) : (
              <div className="relative z-[9999]" ref={dropdownRef}>
                <FiUser
                  size={22}
                  className="cursor-pointer"
                  onClick={() => setShowProfile((prev) => !prev)}
                />

                {showProfile && (
                  <div className="absolute right-0 mt-4 w-52 bg-white rounded-xl shadow-xl p-3 text-sm z-[9999]">
                    <p className="font-semibold mb-3 truncate">
                      Hi, {user.name}
                    </p>

                    {isAdmin ? (
                      <div
                        onClick={() => { navigate("/admin/dashboard"); setShowProfile(false) }}
                        className="flex gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <MdOutlinePersonOutline /> Admin Dashboard
                      </div>
                    ) : (
                      <>
                        <div
                          onClick={() => { navigate("/profile"); setShowProfile(false) }}
                          className="flex gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                          <MdOutlinePersonOutline /> My Profile
                        </div>
                        <div
                          onClick={() => { navigate("/orders"); setShowProfile(false) }}
                          className="flex gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                        >
                          <FiPackage /> Orders
                        </div>
                      </>
                    )}

                    <div
                      onClick={handleLogout}
                      className="flex gap-2 px-3 py-2 rounded-lg hover:bg-red-100 text-red-600 cursor-pointer"
                    >
                      <FiLogOut /> Logout
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* hide cart for admin */}
            {!isAdmin && (
              <Link to="/cart" className="relative">
                <FiShoppingCart size={22} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
            )}

            <FiMenu
              onClick={() => setVisible(true)}
              className="sm:hidden cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* PUSH CONTENT DOWN */}
      <div className="h-28" />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white transition-transform duration-300 z-[1000]
        ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4">
          <div onClick={() => setVisible(false)} className="flex gap-2 cursor-pointer mb-4">
            <FiArrowRight className="rotate-180" /> Back
          </div>

          {isAdmin ? (
            ["/admin/dashboard", "/admin/products", "/admin/orders", "/admin/users"].map((path) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setVisible(false)}
                className="block py-3 border-b"
              >
                {path.replace("/admin/", "").toUpperCase()}
              </NavLink>
            ))
          ) : (
            ["/", "/collections", "/about", "/contact"].map((path) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setVisible(false)}
                className="block py-3 border-b"
              >
                {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
              </NavLink>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar