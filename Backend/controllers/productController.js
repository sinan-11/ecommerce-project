import Product from "../models/Product.js";

export const getProduct = async (req, res) => {
  try {
    const { search, category, gender, page = 1, limit = 12 } = req.query

    const filter = {}

    if (category && category !== "All") {
      const categories = category.split(",")
      filter.category = { $in: categories }
    }

    if (gender && gender !== "All") {
      filter.gender = gender
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ]
    }

    const pageNum  = parseInt(page)
    const limitNum = parseInt(limit)
    const skip     = (pageNum - 1) * limitNum

    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(limitNum),
      Product.countDocuments(filter),
    ])

    res.json({
      products,
      total,
      page:       pageNum,
      totalPages: Math.ceil(total / limitNum),
      hasNext:    pageNum < Math.ceil(total / limitNum),
      hasPrev:    pageNum > 1,
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, brand, category, price, gender, images, sizes, description, stock } = req.body
    const product = await Product.create({ name, brand, category, price, gender, images, sizes, description, stock })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    product.name        = req.body.name        || product.name
    product.brand       = req.body.brand       || product.brand
    product.category    = req.body.category    || product.category
    product.price       = req.body.price       || product.price
    product.gender      = req.body.gender      || product.gender
    product.images      = req.body.images      || product.images
    product.sizes       = req.body.sizes       || product.sizes
    product.description = req.body.description || product.description
    product.stock       = req.body.stock       || product.stock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    await product.deleteOne()
    res.json({ message: "Product removed successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}