import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../Footer";

export default function AboutPage() {
  const team = [
    { name: "Gyanendra Sahoo", role: "Team Lead & Frontend Developer" },
    { name: "Abinash Ojha", role: "Full‑Stack Developer" },
    { name: "Ankit Kumar Nath", role: "ML Developer" },
    { name: "Kamalesh Mohapatra", role: "ML Developer" },
    { name: "Shraban Kumar Bartia", role: "Backend Developer" },
    { name: "Snehasnigdha Dash", role: "Ui/Ux Designer & Research" },
 
  ];

  const features = [
    {
      title: "Personalized Ayurvedic Diet Plans",
      desc: "Dietitians enter patient parameters (prakriti, vikriti, age, lifestyle, allergies) and receive a tailored day-wise plan.",
    },
    {
      title: "Evidence‑aware Recommendations",
      desc: "Guidance combines classical Ayurvedic principles with modern nutrition practices and clinical data.",
    },
    {
      title: "Flexible Templates & Export",
      desc: "Generate printable plans, patient handouts, or shareable links — customize templates to your clinic's style.",
    },
    {
      title: "Clinical Workflow Friendly",
      desc: "Integrates with practitioner notes, supports follow‑ups, and stores diet history per patient.",
    },
  ];

  return (
    <div className="min-h-screen text-gray-900">
        <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12 mt-10 font-[Poppins]">
        <section id="hero" className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Evidence‑aware Ayurvedic diet plans — generated for each patient</h2>
            <p className="mt-4 text-gray-600">AyurDietGen helps licensed dietitians and Ayurvedic practitioners convert patient parameters into clear, actionable diet plans — fast. Spend less time writing plans and more time with patients.</p>

            <div className="mt-6 flex gap-3">
              <a href="#how" className="inline-block px-5 py-3 bg-emerald-500 text-white rounded-lg shadow hover:opacity-95">See how it works</a>
              <a href="#team" className="inline-block px-5 py-3 border rounded-lg text-gray-700 hover:bg-gray-50">Meet the team</a>
            </div>
          </div>

          <div className="bg-green-200 rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold">Quick preview</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-medium">Input patient parameters</div>
                  <div className="text-sm text-gray-500">Prakriti, digestion, allergies, medications, goals.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-amber-300" />
                <div>
                  <div className="font-medium">Generate plan</div>
                  <div className="text-sm text-gray-500">Daily meals, portion notes, cooking tips and timing.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-300" />
                <div>
                  <div className="font-medium">Export & follow up</div>
                  <div className="text-sm text-gray-500">PDF/print or save to patient history for follow‑up.</div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section id="mission" className="mt-14 bg-gradient-to-r from-green-300 to-green-200 p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold">Our Mission</h3>
          <p className="mt-3 text-gray-700">We empower Ayurvedic practitioners and clinical dietitians with an easy-to-use platform that turns clinical intake into personalized, culturally-aware diet recommendations. Our goal is to increase quality, consistency, and patient adherence while respecting classical Ayurvedic knowledge.</p>
        </section>

        <section id="how" className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-green-200 rounded-2xl shadow p-6">
            <h4 className="text-xl font-semibold">How it works</h4>
            <ol className="mt-4 space-y-4 text-gray-700 list-decimal list-inside">
              <li><strong>Intake:</strong> Dietitian fills in patient parameters — prakriti, vikriti, digestion, current meds, allergies, lifestyle and goals.</li>
              <li><strong>Processing:</strong> The platform maps inputs to Ayurvedic dietary principles and evidence-based nutritional guidelines.</li>
              <li><strong>Output:</strong> A structured diet plan (meals, portioning, timings, herbs/recipes, cautions) and clinician notes.
              </li>
              <li><strong>Iterate:</strong> Adjust and save templates for repeatable follow-ups and long-term tracking.</li>
            </ol>
          </div>

          <aside className="bg-emerald-50 rounded-2xl p-6">
            <h5 className="font-semibold">Designed for clinical use</h5>
            <p className="mt-3 text-sm text-gray-700">HIPAA‑aware design patterns, exportable patient handouts, and role-based access for practitioners.</p>
          </aside>
        </section>

        <section id="features" className="mt-10">
          <h4 className="text-xl font-semibold">Key features</h4>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-green-200 p-4 rounded-lg shadow-sm">
                <h6 className="font-medium">{f.title}</h6>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="team" className="mt-12">
          <h4 className="text-xl font-semibold">The team</h4>
          <p className="mt-2 text-sm text-gray-600">A small cross-disciplinary team combining clinical, engineering and design expertise.</p>

          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.name} className="bg-green-200 p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center text-xl font-semibold">{m.name.split(" ").map(n => n[0]).slice(0,2).join("")}</div>
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-500">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-12 bg-green-200 rounded-2xl p-6 shadow-sm">
          <h4 className="text-lg font-semibold">Get in touch</h4>
          <p className="mt-2 text-sm text-gray-600">Interested in a demo or partnership? Email us at <a href="mailto:hello@ayurdietgen.com" className="text-emerald-600 hover:underline">hello@ayurdietgen.com</a></p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
