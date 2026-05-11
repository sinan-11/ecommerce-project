import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name:     { type: String, required: true },
      price:    { type: Number, required: true },
      image:    { type: String },
      size:     { type: Number },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true })

const Cart = mongoose.model('Cart', cartSchema)
export default Cart