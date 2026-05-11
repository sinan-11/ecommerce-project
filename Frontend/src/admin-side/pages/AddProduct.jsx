import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createProduct } from "../../api/admin"

function AddProduct() {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "",
    price: "",
    description: "",
    images: [],
    sizes: []
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleImageChange = (index, value) => {
    const updated = [...form.images]
    updated[index] = value
    setForm({ ...form, images: updated })
  }

  const addImage = () =>
    setForm({ ...form, images: [...form.images, ""] })

  const removeImage = (index) =>
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) })

  const toggleSize = (size) =>
    setForm(prev => {
      const exists = prev.sizes.find(s => s.size === size)
      return {
        ...prev,
        sizes: exists
          ? prev.sizes.filter(s => s.size !== size)
          : [...prev.sizes, { size, stock: 10 }]
      }
    })

  const updateStock = (size, stock) =>
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.map(s =>
        s.size === size ? { ...s, stock: Number(stock) } : s
      )
    }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    createProduct({
      ...form,
      price: Number(form.price),
      sizes: form.sizes
    })
      .then(() => {
        toast.success("Product added successfully")
        navigate("/admin/products")
      })
      .catch(() => toast.error("Failed to add product"))
      .finally(() => setSaving(false))
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-14">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
            Inventory
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mt-1">
            Add Product
          </h1>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-10">

            <section className="space-y-6">
              <Field label="Product Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Air Jordan 1 Mid"
                  required
                  className="input"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Field label="Brand">
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="Nike"
                    className="input"
                  />
                </Field>

                <Field label="Category">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="input bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Running Shoes">Running Shoes</option>
                    <option value="Sneakers">Sneakers</option>
                  </select>
                </Field>

                <Field label="Gender">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="input bg-white"
                  >
                    <option value="">Select</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Unisex</option>
                  </select>
                </Field>
              </div>

              <Field label="Price">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="7999"
                  className="input"
                />
              </Field>

              <Field label="Description">
                <textarea
                  rows="4"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Write a short product description…"
                  className="input resize-none"
                />
              </Field>
            </section>

            <section>
              <h3 className="section-title">Product Images</h3>
              <div className="space-y-3">
                {form.images.map((img, i) => (
                  <div key={i} className="flex gap-3">
                    <input
                      value={img}
                      onChange={e => handleImageChange(i, e.target.value)}
                      placeholder={`Image URL ${i + 1}`}
                      className="input flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="px-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addImage}
                className="mt-4 px-4 py-2 text-sm rounded-lg bg-zinc-900 text-white hover:bg-zinc-700"
              >
                + Add Image
              </button>

              {form.images.length > 0 && (
                <div className="flex gap-3 flex-wrap mt-4">
                  {form.images.map((img, i) =>
                    img && (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                    )
                  )}
                </div>
              )}
            </section>

            <section>
              <h3 className="section-title">Available Sizes</h3>
              <p className="text-xs text-zinc-400 mb-3">
                Click a size to select it, then set its stock quantity below.
              </p>
              <div className="flex gap-3 flex-wrap">
                {[6, 7, 8, 9, 10, 11].map(size => {
                  const entry = form.sizes.find(s => s.size === size)
                  return (
                    <div key={size} className="flex flex-col items-center gap-1">
                      <button
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition
                          ${entry
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "bg-white hover:border-zinc-400"
                          }`}
                      >
                        {size}
                      </button>
                      {entry && (
                        <input
                          type="number"
                          min="0"
                          value={entry.stock}
                          onChange={e => updateStock(size, e.target.value)}
                          className="w-16 text-center border border-zinc-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-zinc-900"
                          placeholder="stock"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            <div className="flex flex-col items-end gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="w-40 px-6 py-2 rounded-lg border text-sm hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-40 px-6 py-2 rounded-lg bg-zinc-900 text-white text-sm hover:bg-zinc-700"
              >
                {saving ? "Saving..." : "Add Product"}
              </button>
            </div>

          </form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e4e4e7;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #18181b;
          box-shadow: 0 0 0 2px rgba(24,24,27,0.08);
        }
        .section-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #18181b;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  )
}

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-zinc-500 mb-1">
      {label}
    </label>
    {children}
  </div>
)

export default AddProduct