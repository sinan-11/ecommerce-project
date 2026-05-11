import User from '../models/User.js'


export const getAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('address')
    res.json(user.address || {})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const saveAddress = async (req, res) => {
  try {
    const { name, phone, street, city, state, pincode } = req.body

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { address: { name, phone, street, city, state, pincode } },
      { new: true }
    ).select('address')

    res.json(user.address)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const toggleBlockUser = async (req, res) => {
  try {
    const { blocked } = req.body

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { blocked },
      { new: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}