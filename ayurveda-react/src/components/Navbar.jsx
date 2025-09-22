import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-100 backdrop-blur-md shadow-md px-6 font-[Poppins]">
      <div className="container mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600 tracking-wide">
          Ayur<span className="text-green-600">Diet</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-green-600 font-medium">
          <li>
            <Link to="/" className="hover:text-green-900 transition">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-900 transition">About</Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-green-900 transition">Services</Link>
          </li>
          <li>
            <Link to="/works" className="hover:text-green-900 transition">Works</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-900 transition">Contact</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-[#72A919] via-[#8BC34A] to-[#689F38] px-6 pt-4 pb-6 space-y-4 text-white font-medium shadow-lg animate-in">
          <a href="#home" className="block hover:text-yellow-300 transition" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" className="block hover:text-yellow-300 transition" onClick={() => setIsOpen(false)}>About</a>
          <a href="#services" className="block hover:text-yellow-300 transition" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#works" className="block hover:text-yellow-300 transition" onClick={() => setIsOpen(false)}>Works</a>
          <a href="#contact" className="block hover:text-yellow-300 transition" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
