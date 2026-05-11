import Cart from '../models/Cart.js'


export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
  res.json(cart || { items: [] })
}


export const addToCart = async (req, res) => {
  const { product, name, price, image, size, quantity = 1 } = req.body

  if (!product || !name || !price || !size)
    return res.status(400).json({ message: 'Missing fields' })

  let cart = await Cart.findOne({ user: req.user._id })

  if (!cart) {
   
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product, name, price, image, size, quantity }]
    })
    return res.status(201).json(cart)
  }

  
  const existingIndex = cart.items.findIndex(
    (item) =>
      item.product.toString() === product &&
      item.size === size
  )

  if (existingIndex >= 0) {
    
    cart.items[existingIndex].quantity += quantity
  } else {
    cart.items.push({ product, name, price, image, size, quantity })
  }

  await cart.save()
  res.json(cart)
}


export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
  if (!cart) return res.status(404).json({ message: 'Cart not found' })

  cart.items = cart.items.filter(
    (item) => item._id.toString() !== req.params.itemId
  )

  await cart.save()
  res.json(cart)
}


export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id })
  res.json({ message: 'Cart cleared' })
}