import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProducts } from "../api/products"

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function Collections() {
  const [prod, setProd]                   = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [searching, setSearching]         = useState(false)
  const [error, setError]                 = useState(null)
  const [search, setSearch]               = useState("")
  const [category, setCategory]           = useState("All")
  const [gender, setGender]               = useState("All")
  const [page, setPage]                   = useState(1)
  const [totalPages, setTotalPages]       = useState(1)

  const LIMIT = 12
  const debouncedSearch = useDebounce(search, 400)

  // reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, category, gender])

  useEffect(() => {
    if (initialLoading) {
      // first load — show full loading screen
    } else {
      setSearching(true)
    }

    getProducts({ search: debouncedSearch, category, gender, page, limit: LIMIT })
      .then((res) => {
        setProd(res.data.products)
        setTotalPages(res.data.totalPages)
        setInitialLoading(false)
        setSearching(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load products")
        setInitialLoading(false)
        setSearching(false)
      })
  }, [debouncedSearch, category, gender, page])

  if (initialLoading) return <p className="text-center mt-10 text-gray-500">Loading...</p>
  if (error)          return <p className="text-center mt-10 text-red-400">{error}</p>

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Products"
        className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="All">All Categories</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Running Shoes">Running Shoe</option>
        </select>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="All">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      {searching && (
        <p className="text-sm text-gray-400 mb-4">Searching...</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {prod.length > 0 ? (
          prod.map((item) => (
            <Link to={`${item._id}`} key={item._id}>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.category}</p>
                  <h2 className="text-base font-medium text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{item.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No products found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">

          {/* Prev */}
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-100 transition"
          >
            ← Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 text-sm rounded-lg border transition
                ${page === p
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100"
                }`}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Next →
          </button>

        </div>
      )}
    </div>
  )
}

export default Collections