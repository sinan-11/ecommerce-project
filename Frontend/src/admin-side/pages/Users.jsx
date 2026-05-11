import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getAllUsers, toggleBlockUser } from "../../api/admin"

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  /* ===== FETCH USERS (ONLY ROLE: USER) ===== */
  useEffect(() => {
    getAllUsers()
      .then(res => {
        setUsers(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  /* ===== BLOCK / UNBLOCK ===== */
  const toggleBlock = async (user) => {
    try {
      const updatedUser = {
        ...user,
        blocked: !user.blocked
      }

      await toggleBlockUser(user._id, updatedUser.blocked)
  
      setUsers(prev =>
        prev.map(u =>
          u._id === user._id ? updatedUser : u
        )
      )

      toast.success(
        updatedUser.blocked ? "User blocked" : "User unblocked"
      )
    } catch {
      toast.error("Failed to update user")
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading users...
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">
        Users
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <table className="w-full bg-white shadow rounded-xl overflow-hidden">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm text-gray-500">
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody>
             {users.map(u => (
              <tr
                key={u._id}
                className={`border-b last:border-none ${
                  u.blocked ? "bg-red-50" : ""
                }`}
              >
                <td className="p-4 font-medium">{u.name}</td>
                <td>{u.email}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.blocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {u.blocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="text-right pr-6">
                  <button
                    onClick={() => toggleBlock(u)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      u.blocked
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {u.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
           {users.map(u => (
            <div
              key={u._id}
              className={`bg-white border rounded-xl p-4 shadow-sm ${
                u.blocked ? "border-red-300" : ""
              }`}
            >
            <div className="mb-2">
              <p className="font-semibold text-lg">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  u.blocked
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {u.blocked ? "Blocked" : "Active"}
              </span>

              <button
                onClick={() => toggleBlock(u)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  u.blocked
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {u.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="text-gray-400 mt-10">
          No users found
        </p>
      )}
    </div>
  )
}

export default Users