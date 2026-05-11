import React from "react"
import { useNavigate } from "react-router-dom"

function Profile() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  // Safety check
  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          navigate("/login")
        }}
        className="mt-8 bg-black text-white px-6 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default Profile
