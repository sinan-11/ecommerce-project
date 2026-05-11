import React from "react";
import Logo from "../assets/logo.png.png"; // adjust path if needed

function About() {
  return (
    <div className="bg-white text-gray-700">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        
        {/* Logo */}
  
       

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About Us
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          We are committed to delivering premium products with exceptional
          quality, style, and customer experience.
        </p>
      
       
        
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our brand was created with a simple goal — to provide high-quality
            products that blend comfort, durability, and modern design. We
            carefully select every product to ensure it meets our standards.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to make online shopping easy, secure, and enjoyable. From
            product selection to delivery, we focus on giving our customers a
            seamless experience every step of the way.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900">
                Premium Quality
              </h3>
              <p className="text-gray-600 mt-2">
                Carefully selected products with high standards.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900">
                Secure Shopping
              </h3>
              <p className="text-gray-600 mt-2">
                Safe payments and reliable checkout.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg text-gray-900">
                Customer First
              </h3>
              <p className="text-gray-600 mt-2">
                Support that truly cares about you.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;
