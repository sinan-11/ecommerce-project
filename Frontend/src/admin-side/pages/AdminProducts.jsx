import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { getProducts, deleteProduct } from "../../api/admin"

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data.products))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false))
  }, [])

  /* ===== CONFIRM DELETE ===== */
  const confirmDelete = (onConfirm) => {
    toast(
      ({ closeToast }) => (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-zinc-900">
            Delete this product?
          </p>
          <p className="text-xs text-zinc-500">
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={closeToast}
              className="px-3 py-1.5 text-xs rounded-lg border hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm()
                closeToast()
              }}
              className="px-3 py-1.5 text-xs rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    )
  }

  const deleteProductHandler = async (id) => {
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p._id !== id))
      toast.success("Product deleted")
    } catch {
      toast.error("Delete failed")
    }
  }

  const handleDelete = (id) => {
    confirmDelete(() => deleteProductHandler(id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white px-4 sm:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 font-semibold">
              Inventory
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight">
              Products
            </h1>
          </div>

          <button
            onClick={() => navigate("/admin/products/add")}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            + Add Product
          </button>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-[90px_1fr_180px] px-6 py-4 bg-zinc-50 border-b">
            <span className="table-head">Image</span>
            <span className="table-head">Product</span>
            <span className="table-head text-right">Actions</span>
          </div>

          {loading && (
            <div className="py-28 text-center text-sm text-zinc-400">
              Loading products...
            </div>
          )}

          {!loading && products.map(item => (
            <div
              key={item._id}
              className="grid grid-cols-[90px_1fr_180px] px-6 py-5 items-center border-b last:border-none hover:bg-zinc-50 transition"
            >
              {/* IMAGE */}
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover ring-1 ring-zinc-200"
              />

              {/* INFO */}
              <div>
                <p className="text-sm font-medium text-zinc-900">
                  {item.name}
                </p>
                <p className="text-xs text-zinc-400">
                  ID: {item._id}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/admin/products/edit/${item._id}`)}
                  className="action-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="action-btn danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {!loading && products.length === 0 && (
            <div className="py-28 text-center text-sm text-zinc-400">
              No products found
            </div>
          )}
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden space-y-4">
          {loading && (
            <p className="text-center text-sm text-zinc-400">
              Loading products...
            </p>
          )}

          {!loading && products.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-4 flex gap-4"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover ring-1 ring-zinc-200"
              />

              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900">
                  {item.name}
                </p>
                <p className="text-xs text-zinc-400 mb-3">
                  ID: {item._id}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/products/edit/${item._id}`)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-zinc-900 text-white shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-red-50 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && products.length === 0 && (
            <p className="text-center text-sm text-zinc-400">
              No products found
            </p>
          )}
        </div>

        {/* FOOTER */}
        {!loading && products.length > 0 && (
          <p className="text-xs text-zinc-400 text-right">
            {products.length} products total
          </p>
        )}
      </div>

      {/* SHARED STYLES */}
      <style>{`
        .table-head {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #a1a1aa;
        }
        .action-btn {
          padding: 6px 14px;
          font-size: 12px;
          border-radius: 10px;
          background: #f4f4f5;
          transition: all 0.15s ease;
        }
        .action-btn:hover {
          background: #e4e4e7;
        }
        .action-btn.danger {
          background: #fee2e2;
          color: #dc2626;
        }
      `}</style>
    </div>
  )
}

export default AdminProducts