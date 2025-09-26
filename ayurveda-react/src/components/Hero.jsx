import React from "react";

const Hero = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row px-4 md:px-16 lg:px-32 pt-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full opacity-15 blur-2xl"></div>
      
      {/* Sacred geometry pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-20 w-16 h-16 border border-green-300 rotate-45"></div>
        <div className="absolute bottom-40 left-40 w-12 h-12 border border-amber-300 rounded-full"></div>
        <div className="absolute top-48 right-32 w-20 h-20 border border-orange-300 rotate-12"></div>
      </div>
      
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 relative z-10">
        {/* Decorative elements with Sanskrit-inspired design */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <div className="w-8 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-900 via-green-800 to-green-700 bg-clip-text text-transparent leading-tight">
          Empowering <span className="italic">Ayurvedic</span> Nutrition for <span className="text-red-800">Every Body</span>, Every Lifestyle
        </h1>
        
        <p className="text-green-900 text-base sm:text-lg max-w-lg leading-relaxed font-light">
          Transform healthcare with precision Ayurvedic nutrition planning. Our evidence-based platform harmonizes the ancient wisdom of <em>Vata</em>, <em>Pitta</em>, and <em>Kapha</em> with modern dietary science to deliver personalized nutrition solutions that promote optimal health and wellness.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="group px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-medium relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Begin Your Journey</span>
          </button>
          <button className="px-8 py-3 border-2 border-green-600 text-green-700 rounded-xl hover:bg-green-600 hover:text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium">
            Discover Wisdom
          </button>
        </div>
        
        {/* Enhanced feature highlights with Ayurvedic terminology */}
        <div className="flex flex-col sm:flex-row gap-6 pt-6 text-sm">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-green-700 font-medium">Prakriti Analysis</span>
          </div>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-amber-700 font-medium">Agni Optimization</span>
          </div>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-orange-700 font-medium">Holistic Wellness</span>
          </div>
        </div>
        
        {/* Subtle Ayurvedic quote */}
        <div className="pt-4 opacity-70">
          <p className="text-green-700 text-sm italic font-stretch-semi-condensed">
            "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."
          </p>
          <p className="text-green-700 text-xs mt-1 font-bold">— Ancient Ayurvedic Wisdom</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 relative">
        <div className="relative">
          
          <img
            src="/images/right-hero.png"
            alt="Ayurvedic Nutrition Illustration"
            className="relative w-full h-auto object-contain max-w-xs sm:max-w-sm md:max-w-md drop-shadow-2xl rounded-xl"
          />
        </div>
      </div>
  
    </div>
  );
};



export default Hero;