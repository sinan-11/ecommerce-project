import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { ProductContext } from "../context/ProductContext"

function Home() {
  const { products, loading } = useContext(ProductContext)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="border border-gray-200 px-10 py-4 text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
          Loading drops…
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-stone-50 text-gray-800 overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="pt-24 pb-24 border-b border-gray-200">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-200 bg-stone-50">

            {/* TEXT */}
            <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 border-b lg:border-b-0 lg:border-r border-gray-200">
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-500 mb-8">
                Exclusive Footwear · 2026
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8 text-gray-900">
                Step Into <br />
                <span className="italic font-medium">Timeless Design</span>
              </h1>

              <p className="max-w-xl text-gray-600 text-lg font-light leading-relaxed mb-12">
                A refined sneaker collection where premium craftsmanship meets
                modern lifestyle and effortless elegance.
              </p>

              <Link
                to="/collections"
                className="inline-block w-fit bg-gray-800 text-white px-12 py-4 text-sm font-medium tracking-wide hover:bg-gray-900 transition"
              >
                Explore Collection
              </Link>
            </div>

            {/* IMAGE */}
            <div className="relative h-[420px] lg:h-[640px] overflow-hidden bg-gray-200">
              <img
                src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/3/5324c8eNike-554724-061_5.jpg?rnd=20200526195200&tr=w-1080"
                alt="Sneaker editorial"
                className="w-full h-full object-cover"
              />
              {/* DARKER OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}


      {/* ================= CURATED ================= */}
      <section className="py-24 border-b border-gray-200">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-12">
            <div>
              <h2 className="text-3xl font-light tracking-tight mb-2 text-gray-900">
                Trending Products
              </h2>
              <p className="text-sm text-gray-600 font-light">
                The finest sneakers of the season
              </p>
            </div>
            <Link
              to="/collections"
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-gray-700 transition"
            >
              View all styles
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(item => (
              <Link
                key={item._id}
                to={`/collections/${item._id}`}
                className="group border border-gray-200 bg-stone-50 hover:border-gray-800 hover:shadow-sm transition"
              >
                <div className="aspect-[4/5] overflow-hidden border-b border-gray-200 bg-gray-100">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="p-6 text-center h-[120px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium line-clamp-1 text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 uppercase tracking-widest">
                      {item.brand || "Premium"}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    ₹{item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
            <section className="py-20 border-b border-gray-200">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-200 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 bg-stone-50">
            {[
              ["Complimentary Delivery", "On all sneaker orders"],
              ["Premium Materials", "Uncompromising quality"],
              ["Authenticity Guaranteed", "100% verified original"],
              ["Effortless Returns", "7-day seamless process"],
            ].map(([title, desc], i) => (
              <div key={i} className="p-10 text-center hover:bg-stone-100 transition">
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-3 text-gray-800">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home