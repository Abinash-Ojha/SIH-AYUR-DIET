import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white mt-16 font-[Poppins] px-6">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Tagline */}
          <div>
            <h2 className="text-2xl font-bold">
              Ayur<span className="text-white">Diet</span>
            </h2>
            <p className="mt-3 text-sm opacity-90">
              Ancient Wisdom, Modern Wellness.  
              Personalized Ayurvedic diet plans for your unique journey.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-6 md:gap-3 text-sm font-medium">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-white transition">
              About
            </Link>
            <Link to="/services" className="hover:text-white transition">
              Services
            </Link>
            <Link to="/works" className="hover:text-white transition">
              Works
            </Link>
            <Link to="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <Link to="/" className="hover:text-white transition">
                <Facebook size={22} />
              </Link>
              <Link to="/" className="hover:text-white transition">
                <Instagram size={22} />
              </Link>
              <Link to="/" className="hover:text-white transition">
                <Twitter size={22} />
              </Link>
              <Link to="/" className="hover:text-white transition">
                <Linkedin size={22} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider + Bottom Text */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-80">
          © {new Date().getFullYear()} AyurDiet. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
