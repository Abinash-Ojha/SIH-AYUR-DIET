import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../Footer";

export default function ServicesPage() {
  const services = [
    {
      title: "Personalized Diet Generation",
      desc: "Generate Ayurvedic diet plans based on patient-specific parameters like prakriti, vikriti, age, digestion, allergies, and lifestyle.",
      icon: "🥗",
    },
    {
      title: "Follow‑Up & Tracking",
      desc: "Save diet histories, compare progress, and adjust recommendations in follow‑up sessions.",
      icon: "📊",
    },
    {
      title: "Export & Sharing",
      desc: "Download diet plans as PDF, print handouts, or share secure links with patients.",
      icon: "📄",
    },
    {
      title: "Clinical Integrations",
      desc: "Easily integrate with practitioner notes and clinic management tools for smoother workflows.",
      icon: "⚕️",
    },
    {
      title: "Customizable Templates",
      desc: "Create and save your own templates for common conditions, diets, or seasonal recommendations.",
      icon: "📝",
    },
    {
      title: "Evidence‑Aware Recommendations",
      desc: "Blend traditional Ayurvedic knowledge with modern nutrition science to improve patient adherence.",
      icon: "📚",
    },
  ];

  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 mt-10 font-[Poppins]">
        <section className="text-center">
          <h2 className="text-3xl font-extrabold">Services at AyurDietGen</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide a set of powerful tools designed to support Ayurvedic practitioners and clinical dietitians in creating personalized, evidence-aware diet plans.
          </p>
        </section>

        <section className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-green-200 rounded-2xl shadow p-6 hover:shadow-md transition">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 bg-gradient-to-r from-green-300 to-green-200 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-semibold">Want to see AyurDietGen in action?</h3>
          <p className="mt-3 text-gray-700">Book a demo with our team and experience how easy it is to generate Ayurvedic diet plans for your patients.</p>
          <a href="mailto:hello@ayurdietgen.com" className="mt-6 inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg shadow hover:opacity-95">
            Request a Demo
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
