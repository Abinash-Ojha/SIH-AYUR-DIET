import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage.jsx";
import DoctorPage from "./components/DoctorPage.jsx";
import PatientPage from "./components/PatientPage.jsx";
import Home from "./components/Home.jsx";
import { AuthProvider } from "./context/AuthContext";
import ModelResponsePage from "./components/ModelResponsePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicePage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/works" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="/doctor/dashboard" element={<DoctorPage />} />
          <Route path="/patient/dashboard" element={<PatientPage />} />
          <Route path="/model-response" element={<ModelResponsePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
