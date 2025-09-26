import React from "react";
import { Facebook, Instagram, Twitter, Linkedin,XIcon,XSquare} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-amber-400 via-green-300 to-lime-200 text-black overflow-hidden pt-14">
      {/* Ayurvedic Decorative Mandala/Leaf */}
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-32 h-32 opacity-25 pointer-events-none">
        {/* You can replace this with an actual SVG mandala or leaf */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="#76b947" fillOpacity="0.17" />
          <circle cx="50" cy="50" r="28" fill="#ffcc60" fillOpacity="0.13" />
          {/* decorative leaf pattern */}
          <path d="M50 28 Q62 45, 50 72 Q38 45, 50 28" fill="#b6e282" fillOpacity="0.22"/>
        </svg>
      </div>
      {/* Soft leafy/faded herbal corners */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-gradient-to-br from-green-200/30 to-lime-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 bg-gradient-to-br from-amber-200/20 to-orange-200/30 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo + Tagline with Mandala/Leaf */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-amber-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-green-200">
                {/* Mandala/Leaf SVG icon */}
            <span className="text-white font-bold text-sm">🌿</span>
          
              </div>
              <h2 className="text-3xl font-extrabold tracking-wide text-black">
                Ayur<span className="text-green-600">Diet</span>
              </h2>
            </div>
            <p className="text-green-900 leading-relaxed max-w-xs mx-auto md:mx-0 text-sm">
              Rooted in Ayurveda. Personalized nutrition for harmony and vitality.
              <span className="block mt-1 text-amber-800">
                Embrace balance, nurture wellness.
              </span>
            </p>
          </div>
          {/* Navigation Links with Herbal Accent */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-green-900 tracking-wide">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              {["Home", "About Us", "Services", "Our Work", "Contact"].map(
                (item, idx) => (
                  <Link
                    key={idx}
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s/g, "")}`
                    }
                    className="relative text-green-800 hover:text-amber-700 text-sm transition-all duration-300 group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-1 rounded bg-green-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )
              )}
            </div>
          </div>
          {/* Connect with Us and Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-green-900 tracking-wide">
              Connect With Us
            </h3>
            <p className="text-amber-900 mb-4 text-sm">
              Join our Ayurvedic journey for wellness tips & insights.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              {[
                { icon: Facebook, colors: "from-blue-500 to-purple-500" },
                { icon: Instagram, colors: "from-amber-500 to-pink-500" },
                { icon: XIcon, colors: "from-black to-black" },
                { icon: Linkedin, colors: "from-blue-700 to-blue-500" },
              ].map(({ icon: Icon, colors }, idx) => (
                <Link
                  key={idx}
                  to="#"
                  className={`w-10 h-10 bg-gradient-to-br ${colors} rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 hover:shadow-lg hover:ring-2 hover:ring-green-300 transition-transform duration-300`}
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Herbal Divider SVG */}
        <div className="flex justify-center mt-8 mb-2">
          <svg viewBox="0 0 144 18" width="120" height="18" className="opacity-80">
            <path
              d="M2,7 Q14,18,36,9 Q58,0,72,9 Q86,18,108,7 Q130,-4,142,7"
              fill="none"
              stroke="#76b947"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-green-200 mt-6 pt-3 text-center">
          <p className="text-green-900 text-lg font-semibold tracking-wider">
            © {new Date().getFullYear()} AyurDiet. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
