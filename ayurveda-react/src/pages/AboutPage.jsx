import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../Footer";

export default function AboutPage() {
  const team = [
    { name: "Gyanendra Sahoo", role: "Team Lead & Frontend Developer" },
    { name: "Abinash Ojha", role: "Full-Stack Developer" },
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
      title: "Evidence-aware Recommendations",
      desc: "Guidance combines classical Ayurvedic principles with modern nutrition practices and clinical data.",
    },
    {
      title: "Flexible Templates & Export",
      desc: "Generate printable plans, patient handouts, or shareable links — customize templates to your clinic's style.",
    },
    {
      title: "Clinical Workflow Friendly",
      desc: "Integrates with practitioner notes, supports follow-ups, and stores diet history per patient.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 mt-10 font-[Poppins]">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-emerald-600">
              Evidence-aware Ayurvedic diet plans — generated for each patient
            </h2>
            <p className="mt-4 text-gray-600">
              AyurDietGen helps licensed dietitians and Ayurvedic practitioners
              convert patient parameters into clear, actionable diet plans —
              fast. Spend less time writing plans and more time with patients.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#how"
                className="inline-block px-5 py-3 bg-emerald-500 text-white rounded-lg shadow hover:opacity-95"
              >
                See how it works
              </a>
              <a
                href="#team"
                className="inline-block px-5 py-3 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Meet the team
              </a>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-emerald-700">
              Quick preview
            </h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-medium">Input patient parameters</div>
                  <div className="text-sm text-gray-500">
                    Prakriti, digestion, allergies, medications, goals.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-amber-400" />
                <div>
                  <div className="font-medium">Generate plan</div>
                  <div className="text-sm text-gray-500">
                    Daily meals, portion notes, cooking tips and timing.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-orange-400" />
                <div>
                  <div className="font-medium">Export & follow up</div>
                  <div className="text-sm text-gray-500">
                    PDF/print or save to patient history for follow-up.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Mission */}
        <section
          id="mission"
          className="mt-16 bg-emerald-50 p-8 rounded-2xl shadow"
        >
          <h3 className="text-2xl font-semibold text-emerald-600">
            Our Mission
          </h3>
          <p className="mt-3 text-gray-700">
            We empower Ayurvedic practitioners and clinical dietitians with an
            easy-to-use platform that turns clinical intake into personalized,
            culturally-aware diet recommendations.
          </p>
        </section>

        {/* How It Works */}
        <section id="how" className="mt-14 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white border rounded-2xl shadow p-6">
            <h4 className="text-xl font-semibold text-emerald-600">
              How it works
            </h4>
            <ol className="mt-4 space-y-4 text-gray-700 list-decimal list-inside">
              <li>
                <strong>Intake:</strong> Fill in patient parameters — prakriti,
                vikriti, lifestyle, allergies, goals.
              </li>
              <li>
                <strong>Processing:</strong> Platform maps inputs to Ayurvedic +
                evidence-based guidelines.
              </li>
              <li>
                <strong>Output:</strong> Structured diet plan + clinician notes.
              </li>
              <li>
                <strong>Iterate:</strong> Adjust templates for repeatable
                follow-ups.
              </li>
            </ol>
          </div>

          <aside className="bg-emerald-50 rounded-2xl p-6">
            <h5 className="font-semibold text-emerald-700">
              Designed for clinical use
            </h5>
            <p className="mt-3 text-sm text-gray-700">
              HIPAA-aware patterns, exportable handouts, and role-based access.
            </p>
          </aside>
        </section>

        {/* Features */}
        <section id="features" className="mt-14">
          <h4 className="text-xl font-semibold text-emerald-600">
            Key features
          </h4>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-emerald-50 p-5 rounded-xl shadow-sm border"
              >
                <h6 className="font-medium text-emerald-700">{f.title}</h6>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mt-16">
          <h4 className="text-xl font-semibold text-emerald-600">The team</h4>
          <p className="mt-2 text-sm text-gray-600">
            A small cross-disciplinary team combining clinical, engineering and
            design expertise.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="bg-white border p-5 rounded-xl shadow-sm flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-semibold">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-500">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Blurb */}
        <section
          id="contact"
          className="mt-16 bg-emerald-50 rounded-2xl p-6 shadow-sm"
        >
          <h4 className="text-lg font-semibold text-emerald-600">
            Get in touch
          </h4>
          <p className="mt-2 text-sm text-gray-600">
            Email us at{" "}
            <a
              href="mailto:hello@ayurdietgen.com"
              className="text-emerald-600 hover:underline"
            >
              hello@ayurdietgen.com
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
