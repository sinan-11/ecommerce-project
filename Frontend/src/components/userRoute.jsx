import { Navigate } from "react-router-dom"

function UserRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"))
  if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />
  return children
}

export default UserRoute