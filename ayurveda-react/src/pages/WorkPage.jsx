import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../Footer";

export default function WorkPage() {
  const steps = [
    {
      title: "Patient Intake",
      desc: "Dietitian fills in key patient parameters like prakriti, vikriti, digestion, allergies, and health goals.",
      icon: "🧾",
    },
    {
      title: "Processing",
      desc: "Our engine maps patient data to Ayurvedic principles and blends it with modern nutrition science.",
      icon: "⚙️",
    },
    {
      title: "Diet Plan Generation",
      desc: "Instant creation of a structured day-wise plan with meals, timings, recipes, and notes.",
      icon: "🥘",
    },
    {
      title: "Review & Customize",
      desc: "Practitioners can edit, adjust portion sizes, or add seasonal recommendations.",
      icon: "✏️",
    },
    {
      title: "Export & Share",
      desc: "Plans can be downloaded as PDFs, printed as patient handouts, or shared securely online.",
      icon: "📤",
    },
    {
      title: "Follow‑Up Tracking",
      desc: "Track adherence, progress, and adjust plans in future consultations.",
      icon: "📈",
    },
  ];

  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 mt-10 font-[Poppins]">
        <section className="text-center">
          <h2 className="text-3xl font-extrabold">Our Workflow</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            AyurDietGen simplifies the process of turning patient intake data into effective, evidence‑aware Ayurvedic diet plans. Here’s how the journey works:
          </p>
        </section>

        <section className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-green-200 rounded-2xl shadow p-6 hover:shadow-md transition">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 bg-gradient-to-r from-green-300 to-green-200 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-semibold">Efficiency meets Tradition</h3>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
            By combining classical Ayurvedic frameworks with digital tools, we help dietitians provide consistent, high‑quality care while saving valuable time.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
