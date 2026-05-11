import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  if (!token || !user) return <Navigate to="/login" replace />
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />  // ← block admin

  return children
}

export default ProtectedRoute