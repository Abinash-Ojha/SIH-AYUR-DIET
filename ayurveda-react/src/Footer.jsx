import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Clean Top Border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
      
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌿</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Ayur<span className="text-emerald-400">Diet</span>
              </h2>
            </div>
            
            <p className="text-slate-300 leading-relaxed max-w-lg text-sm">
              Empowering healthcare with precision Ayurvedic nutrition planning. 
              Harmonizing ancient wisdom with modern dietary science for optimal wellness.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span>Trusted by 10,000+ healthcare professionals</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((item, idx) => (
                <Link
                  key={idx}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block text-slate-300 hover:text-emerald-400 text-sm transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Resources</h3>
            <div className="space-y-2">
              {["Documentation", "API", "Support", "Blog"].map((item, idx) => (
                <Link
                  key={idx}
                  to={`/${item.toLowerCase()}`}
                  className="block text-slate-300 hover:text-emerald-400 text-sm transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-self-end  mt-8 mb-8">
          <div className="flex gap-4 ">
            {[
              { icon: Facebook, name: "Facebook" },
              { icon: Instagram, name: "Instagram" },
              { icon: Twitter, name: "Twitter" },
              { icon: Linkedin, name: "LinkedIn" },
            ].map(({ icon: Icon, name }, idx) => (
              <Link
                key={idx}
                to="#"
                className="w-9 h-9 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                title={name}
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© {new Date().getFullYear()} AyurDiet. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-emerald-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-emerald-400 transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;