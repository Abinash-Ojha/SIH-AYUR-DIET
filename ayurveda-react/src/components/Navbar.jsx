import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-lg shadow-md border-b border-green-200/30">
      <div className="container mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-gradient-to-br from-emerlad-500 to-emerlad-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">🌿</span>
          </div>
          <div className="text-2xl font-extrabold tracking-wide">
            Ayur<span className="text-emerald-400">Diet</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-emerald-700 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-black transition-colors duration-300 relative group"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-black transition-colors duration-300 relative group"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="hover:text-black transition-colors duration-300 relative group"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/works"
              className="hover:text-black transition-colors duration-300 relative group"
            >
              Works
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-black transition-colors duration-300 relative group"
            >
              Contact
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
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-green-200 shadow-lg rounded-b-2xl">
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
