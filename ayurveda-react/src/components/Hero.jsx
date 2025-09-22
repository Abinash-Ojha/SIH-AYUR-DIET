import React from "react";

const Hero = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row px-4 md:px-16 lg:px-32 pt-32 bg-green-100">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-900 leading-snug font-[Inter]">
          Empowering Ayurvedic Nutrition for Every Body, Every Lifestyle.
        </h1>
        <p className="text-green-800 text-base sm:text-lg max-w-md font-[Crimson-Text]">
          Reimagine diet planning with a solution that respects ancient
          traditions while embracing modern insights. Easily create accurate,
          patient-specific Ayurvedic diets that promote harmony, healing, and
          lifelong wellness.
        </p>
        <button className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 font-[Poppins] transition">
          Learn More
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
        <img
          src="/images/right-hero.png"
          alt="Hero Illustration"
          className="w-full h-auto object-contain max-w-xs sm:max-w-sm md:max-w-md"
        />
      </div>
    </div>
  );
};

export default Hero;
