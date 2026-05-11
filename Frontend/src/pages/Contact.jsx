import React from "react";
import Logo from "../assets/logo.png.png"; // adjust path if needed

function Contact() {
  return (
    <div className="bg-white text-gray-700">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        
        {/* Logo */}
       
        

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Contact Us
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions or need help? We’re here to assist you.  
          Reach out to us anytime and we’ll get back to you shortly.
        </p>
        <br /><br /><br />
         <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="Brand Logo"
            className="h-46 md:h-40 object-contain"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-1 grid md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
  <div className="md:col-span-2 flex justify-center items-center">
  <div className="text-center max-w-md">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
      Get in Touch
    </h2>

    <p className="text-gray-600 mb-6">
      We’d love to hear from you. Whether you have a question about
      products, orders, or anything else, our team is ready to help.
    </p>

    <div className="space-y-4 text-gray-600 mb-20">
      <p>
        <span className="font-medium text-gray-900">Email:</span>{" "}
        dropnwalk@gmail.com
      </p>
      <p>
        <span className="font-medium text-gray-900">Phone:</span>{" "}
        +91 9633507064
      </p>
      <p>
        <span className="font-medium text-gray-900" >Address:</span>{" "}
        Kochi, Kerala, India
      </p>
    </div>
  </div>
</div>

       
        

      </div>
    </div>
  );
}

export default Contact;
