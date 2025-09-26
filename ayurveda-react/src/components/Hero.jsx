import React, { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div 
      className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgb(16 185 129)" strokeWidth="0.3" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${25 + (i * 12)}%`,
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 8}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div className={`w-2 h-2 rounded-full blur-sm opacity-40 ${
              i % 2 === 0 ? 'bg-emerald-400' : 'bg-teal-400'
            }`} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-200/50 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-800">
                Automating Ayurvedic Diet Plans with Intelligence
              </span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-5">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
                Empowering
                <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                  Ayurvedic Nutrition
                </span>
                <span className="text-slate-700 text-2xl lg:text-3xl xl:text-4xl">
                  for Every Body, Every Lifestyle
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed font-light max-w-2xl">
                Transform healthcare with precision nutrition planning that harmonizes ancient 
                <span className="text-emerald-700 font-medium italic"> Ayurvedic wisdom </span>
                with modern dietary science. Our evidence-based platform delivers personalized nutrition solutions 
                that promote optimal health and wellness through the balanced understanding of 
                <span className="text-green-700 font-medium italic">Vata</span>, 
                <span className="text-amber-700 font-medium italic">Pitta</span>, and 
                <span className="text-orange-700 font-medium italic">Kapha</span> doshas.
              </p>
              

            </div>

            {/* Simple Benefits */}
            <div className="grid grid-cols-2 gap-3 pt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-600">Evidence-based approach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <span className="text-slate-600">Personalized nutrition</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button className="group px-7 py-3 bg-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 text-sm">
                <span className="flex items-center justify-center gap-2">
                  Begin Your Journey
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button className="px-7 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 backdrop-blur-sm bg-white/50 text-sm">
                Learn More
              </button>
            </div>

            {/* Quote */}
            <div className="pt-6">
              <div className="p-5 bg-white/40 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <blockquote className="text-slate-700 italic text-base font-medium leading-relaxed">
                  "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."
                </blockquote>
                <cite className="text-emerald-700 text-sm font-semibold mt-2 block">
                  — Ancient Ayurvedic Wisdom
                </cite>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className={`flex justify-center items-center transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            
            <div className="relative">
              {/* Professional Frame */}
              <div className="bg-white rounded-0.5xl p-6 shadow-2xs border border-gray-200">
                <img
                  src="/images/right-hero.png"
                  alt="Ayurvedic Nutrition Platform"
                  className="w-full h-auto max-w-sm lg:max-w-md object-contain rounded-xl transition-all duration-300 hover:scale-102"
                  style={{
                    filter: 'brightness(1.02) contrast(1.05)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-6 border-2 border-slate-400 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;