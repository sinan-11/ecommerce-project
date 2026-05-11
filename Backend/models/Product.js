import mongoose from "mongoose";


const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
);


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Sneakers", "Running Shoes", "Training Shoes"],
    },

    price: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Unisex"],
    },

    images: [
      {
        type: String,
      },
    ],

    
    sizes: [sizeSchema],

    description: {
      type: String,
    },

    
    totalStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


productSchema.pre("save", function () {
  this.totalStock = this.sizes.reduce(
    (acc, item) => acc + item.stock,
    0
  );
  
});

const Product = mongoose.model("Product", productSchema);

export default Product;