import Order from "../models/Order.js"
import Product from "../models/Product.js"


export const placeOrder = async (req, res) => {
  try {
    const { items, total, address, paymentMethod } = req.body

    if (!items?.length || !total || !address) {
      return res.status(400).json({ message: "Missing order details" })
    }

 
    for (const item of items) {
      const product = await Product.findById(item.product)

      if (!product) {
        return res.status(404).json({ message: "Product not found" })
      }

      const sizeObj = product.sizes.find(
        (s) => s.size === item.size
      )

      if (!sizeObj || sizeObj.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} (Size ${item.size}) out of stock`
        })
      }

     
      sizeObj.stock -= item.quantity
      await product.save()
    }

    
    const order = await Order.create({
      user: req.user._id,
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items,
      total,
      address,
      paymentMethod: paymentMethod || "COD"
    })

    res.status(201).json(order)

  } catch (error) {
    console.error("ORDER ERROR:", error.message)
    res.status(500).json({ message: error.message })
  }
}


export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    const isOwner =
      order.user._id.toString() === req.user._id.toString()

    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        message: `Cannot cancel a ${order.status} order`
      })
    }

  
    for (const item of order.items) {
      const product = await Product.findById(item.product)

      if (!product) continue

      const sizeObj = product.sizes.find(
        (s) => s.size === item.size
      )

      if (sizeObj) {
        sizeObj.stock += item.quantity
        await product.save()
      }
    }

    order.status = "Cancelled"
    const updatedOrder = await order.save()

    res.json(updatedOrder)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: 1 })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    const allowedStatus = ["Pending", "Shipped", "Delivered", "Cancelled"]

    if (req.body.status && !allowedStatus.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    order.status = req.body.status || order.status

    const updatedOrder = await order.save()
    res.json(updatedOrder)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}