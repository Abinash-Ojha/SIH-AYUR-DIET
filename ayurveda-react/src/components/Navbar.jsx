import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-amber-200 via-green-200 to-orange-200 backdrop-blur-md shadow-lg border-b border-green-200/30">
      <div className="container mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Enhanced Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-amber-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🌿</span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-green-700 to-amber-700 bg-clip-text text-transparent tracking-wide">
            Ayur<span className="text-green-600">Diet</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-green-700 font-medium">
          <li>
            <Link 
              to="/" 
              className="hover:text-orange-600 transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-amber-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className="hover:text-orange-600 transition-colors duration-300 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-amber-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/services" 
              className="hover:text-orange-600 transition-colors duration-300 relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-amber-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/works" 
              className="hover:text-orange-600 transition-colors duration-300 relative group"
            >
              Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-amber-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="hover:text-orange-600 transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-amber-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-700 hover:text-amber-600 p-2 rounded-lg hover:bg-green-100 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-green-100 via-amber-50 to-orange-50 border-t border-green-200 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            <Link 
              to="/" 
              className="block text-green-700 hover:text-amber-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-all font-medium" 
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block text-green-700 hover:text-amber-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-all font-medium" 
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="block text-green-700 hover:text-amber-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-all font-medium" 
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/works" 
              className="block text-green-700 hover:text-amber-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-all font-medium" 
              onClick={() => setIsOpen(false)}
            >
              Works
            </Link>
            <Link 
              to="/contact" 
              className="block text-green-700 hover:text-amber-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-all font-medium" 
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;