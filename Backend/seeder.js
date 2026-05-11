import dotenv from "dotenv"
import connectDB from "./config/db.js"
import Product from "./models/Product.js"

dotenv.config()
connectDB()

const products = [
  {
    name: "Jordan",
    brand: "Nike",
    category: "Sneakers",
    gender: "Men",
    price: 7999,
    description: "Inspired by the original AJ1...",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-554724-061_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-554724-061_6.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-554724-061_5.jpg",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/AIR+JORDAN+1+MID.png"
    ],
    sizes: [6,7,8,9,10]
  },

  {
    name: "Nike Court Shot",
    brand: "Nike",
    category: "Sneakers",
    gender: "Men",
    price: 7495,
    description: "Minimalist classic shoe",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-FQ8146-109_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-FQ8146-109_5.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-FQ8146-109_7.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-FQ8146-109_8.jpg"
    ],
    sizes: [6,7,8,9,10,11]
  },

  {
    name: "Nike V5 RNR",
    brand: "Nike",
    category: "Running Shoes",
    gender: "Men",
    price: 3695,
    description: "Comfort meets style",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-HJ5228-010_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-HJ5228-010_5.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-HJ5228-010_7.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-HJ5228-010_8.jpg"
    ],
    sizes: [6,7,8,9]
  },

  {
    name: "Adidas Samba OG",
    brand: "Adidas",
    category: "Sneakers",
    gender: "Men",
    price: 15999,
    description: "Timeless icon",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YADIDA00075333_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/4/d4f9162DADIDA00075333_2.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/4/d4f9162DADIDA00075333_8.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/4/d4f9162DADIDA00075333_9.jpg"
    ],
    sizes: [7,8,9,10,11]
  },

  {
    name: "Adidas Switch FWD 2",
    brand: "Adidas",
    category: "Running Shoes",
    gender: "Men",
    price: 7999,
    description: "Smooth stride running shoe",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YADIDA00085895_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/4/d4f9162DADIDA00085895_6.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/4/d4f9162DADIDA00085895_3.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/4/d4f9162DADIDA00085895_4.jpg"
    ],
    sizes: [6,7,8,9,10]
  },

  {
    name: "Adidas Alphaboost V2",
    brand: "Adidas",
    category: "Running Shoes",
    gender: "Men",
    price: 4999,
    description: "Boost cushioning",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YADIDA00075300_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YADIDA00075300_2.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YADIDA00075300_7.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YADIDA00075300_8.jpg"
    ],
    sizes: [6,7,8,9,10]
  },

  {
    name: "Puma Speedcat",
    brand: "Puma",
    category: "Sneakers",
    gender: "Men",
    price: 8999,
    description: "Racing-inspired design",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YPUMAX00445132_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/3/8/3882cfePUMAX00445132_5.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/3/8/3882cfePUMAX00445132_4.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/3/8/3882cfePUMAX00445132_3.jpg"
    ],
    sizes: [7,8,9,10]
  },

  {
    name: "Puma ForeverRun Nitro 2",
    brand: "Puma",
    category: "Running Shoes",
    gender: "Men",
    price: 5499,
    description: "Support + comfort",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YPUMAX00521904_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YPUMAX00521904_4.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YPUMAX00521904_5.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YPUMAX00521904_3.jpg"
    ],
    sizes: [6,7,8,9]
  },

  {
    name: "New Balance 9060",
    brand: "New Balance",
    category: "Sneakers",
    gender: "Men",
    price: 9999,
    description: "Modern classic design",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/b/fb5a227U9060EEK_0.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/b/fb5a227U9060EEK_3.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/b/fb5a227U9060EEK_4.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/f/b/fb5a227U9060EEK_7.jpg"
    ],
    sizes: [6,7,8,9,10]
  },

  {
    name: "ASICS SKYHAND OG",
    brand: "ASICS",
    category: "Sneakers",
    gender: "Women",
    price: 6999,
    description: "Handball heritage design",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053866_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053866_2.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053866_6.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053866_8.jpg"
    ],
    sizes: [6,7,8,9,10]
  },

  {
    name: "ASICS GEL-NYC",
    brand: "ASICS",
    category: "Running Shoes",
    gender: "Men",
    price: 8999,
    description: "Performance running shoe",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053793_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053793_4.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053793_6.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053793_8.jpg"
    ],
    sizes: [7,8,9,10]
  },

  {
    name: "ASICS GEL-QUANTUM 360 VIII",
    brand: "ASICS",
    category: "Training Shoes",
    gender: "Men",
    price: 11999,
    description: "Training performance",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053790_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053790_2.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053790_8.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YASICS00053790_6.jpg"
    ],
    sizes: [7,8,9,10,11]
  },

  {
    name: "Skechers Max Cushioning",
    brand: "Skechers",
    category: "Running Shoes",
    gender: "Men",
    price: 3995,
    description: "Ultra comfort running",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YSKEAA00057807_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YSKEAA00057807_2.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YSKEAA00057807_3.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YSKEAA00057807_4.jpg"
    ],
    sizes: [6,7,8,9,10]
  },

  {
    name: "Skechers Hotshot Azir",
    brand: "Skechers",
    category: "Sneakers",
    gender: "Men",
    price: 10999,
    description: "Court style comfort",
    images: [
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YSKEAA00062643_1.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YSKEAA00062643_5.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YSKEAA00062643_4.jpg",
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/1/3/13076c7YSKEAA00062643_2.jpg"
    ],
    sizes: [7,8,9,10]
  }
]

// 🔥 Convert sizes → size + stock
const formattedProducts = products.map((product) => ({
  ...product,
  sizes: product.sizes.map((s) => ({
    size: s,
    stock: Math.floor(Math.random() * 10) + 1
  }))
}))

const importData = async () => {
  try {
    await Product.deleteMany()
    await Product.insertMany(formattedProducts)
    console.log("All Products Imported with Stock ✅")
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

importData()