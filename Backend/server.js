import "./config/env.js"         // ← must be first line

import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes    from "./routes/authRoutes.js"
import productRoutes from './routes/productRoutes.js'
import orderRoutes   from './routes/orderRoutes.js'
import cartRoutes    from './routes/cartRoutes.js'
import userRoutes    from './routes/userRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

connectDB()

const app = express()

app.use(cors())
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }))
app.use(express.json())

app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/cart',     cartRoutes)
app.use('/api/user',     userRoutes)
app.use('/api/payment',  paymentRoutes)

app.get('/', (req, res) => res.send("Backend is running"))

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running On ${process.env.PORT}`)
})