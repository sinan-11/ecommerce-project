import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminProtected({ children }) {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))  // ← "user" not "admin"

  if (!token || !user) return <Navigate to="/login" replace />
  if (user.role !== "admin") return <Navigate to="/" replace />

  return children
}

export default AdminProtected