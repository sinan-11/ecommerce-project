import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { register, login } from "../api/auth"

function Login() {
  const [currentState, setCurrentState] = useState("Login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // ← if already logged in, redirect away from login page
  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    if (token && user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true })
      } else {
        navigate("/", { replace: true })
      }
    }
  }, [])

  async function onSubmitHandler(e) {
    e.preventDefault()
    setLoading(true)

    try {
      let res

      // ================= SIGN UP =================
      if (currentState === "Sign Up") {
        res = await register({ name, email, password })
        console.log("RESPONSE:", res.data)

        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role
        }))

        toast.success("Account created successfully!")
        navigate("/collections")
      }

      // ================= LOGIN =================
      if (currentState === "Login") {
        res = await login({ email, password })
        console.log("RESPONSE:", res.data)

        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role
        }))

        toast.success("Login successful")

        if (res.data.role === "admin") {
          navigate("/admin/dashboard", { replace: true })  // ← replace so back button doesn't return to login
        } else {
          navigate("/collections", { replace: true })
        }
      }

      setName("")
      setEmail("")
      setPassword("")

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-10 mb-10 gap-4 text-gray-800"
    >
      <div className="flex flex-col items-center gap-4 mt-10 w-full">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />

        {currentState !== "Login" && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex justify-between text-sm mt-1">
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:underline"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:underline"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white font-light px-8 py-2 mt-4 disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : currentState === "Login"
            ? "LOG IN"
            : "SIGN UP"}
        </button>
      </div>
    </form>
  )
}

export default Login