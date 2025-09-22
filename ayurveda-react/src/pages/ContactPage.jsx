import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 mt-10 font-[Poppins]">
        <section className="text-center">
          <h2 className="text-3xl font-extrabold">Get in Touch</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Whether you’re a practitioner looking for a demo, a partner interested in collaboration, or simply curious about AyurDietGen, we’d love to hear from you.
          </p>
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-green-200 rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <ul className="mt-4 space-y-3 text-gray-700 text-sm">
              <li><strong>Email:</strong> <a href="mailto:hello@ayurdietgen.com" className="text-emerald-600 hover:underline">hello@ayurdietgen.com</a></li>
              <li><strong>Phone:</strong> +91‑9876543210</li>
              <li><strong>Location:</strong> Bhubaneswar, Odisha, India</li>
            </ul>
            <p className="mt-6 text-gray-600 text-sm">We typically respond within 1–2 business days.</p>
          </div>

          <form className="bg-green-200 rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold">Send us a Message</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input type="text" className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea rows="4" className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Type your message here..."></textarea>
              </div>
              <button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded-lg shadow hover:opacity-95">Send Message</button>
            </div>
          </form>
        </section>

        <section className="mt-14 bg-gradient-to-r from-green-300 to-green-200 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-semibold">Let’s Collaborate</h3>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
            We’re open to partnerships with clinics, Ayurvedic centers, and health tech innovators. Together, we can bring personalized Ayurvedic nutrition to more people.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
