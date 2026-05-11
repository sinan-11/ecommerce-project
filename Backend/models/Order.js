import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    orderId: {
      type: String,
      unique: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        name: {
          type: String,
          required: true
        },

        price: {
          type: Number,
          required: true
        },

        image: String,

        size: {
          type: Number,
          required: true 
        },

        quantity: {
          type: Number,
          required: true,
          default: 1
        }
      }
    ],

    total: {
      type: Number,
      required: true
    },

    address: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },

    paymentMethod: {
      type: String,
      default: "COD"
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
)


orderSchema.pre("save", function () {
  if (!this.orderId) {
    this.orderId = "ORD-" + Date.now();
  }
  
})

const Order = mongoose.model("Order", orderSchema)

export default Order