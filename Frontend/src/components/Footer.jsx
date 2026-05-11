import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/logo.png.png'

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Logo + Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={Logo}
                alt="Logo"
                className="w-35 h-25"
              />
              <span className="text-xl font-semibold text-gray-900">
                DROP N WALK
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm">
              A modern ecommerce platform built for quality,
              simplicity, and great user experience.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="text-gray-900 font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link to='/about' className="hover:text-gray-900">About</Link></li>
               
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-gray-500">
                
              
                <li><Link to='/contact' className="hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>

           
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 DROP N WALK. All rights reserved.</p>
          
        </div>

      </div>
    </footer>
  );
}

export default Footer;