import React, { useState } from "react";
import {
  X,
  User,
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Heart,
  Stethoscope,
  CreditCard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Hero from "./Hero";
import Navbar from "../components/Navbar";

/* --- Reusable Input --- */
const InputField = ({
  Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  rightElement,
}) => (
  <div className="relative">
    <Icon className="absolute left-4 top-4 text-slate-400" size={20} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full pl-14 pr-14 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:border-transparent transition-all bg-slate-50/50 font-light"
    />
    {rightElement && (
      <button
        type="button"
        onClick={rightElement.onClick}
        className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        tabIndex={-1}
      >
        {rightElement.icon}
      </button>
    )}
  </div>
);

/* --- Reusable Submit Button --- */
const SubmitButton = ({ loading, children, gradient }) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-full ${gradient} text-white py-4 rounded-2xl 
                hover:scale-[1.02] shadow-lg font-medium 
                transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
  >
    {loading ? (
      <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        {children}...
      </div>
    ) : (
      children
    )}
  </button>
);

export default function HomePage() {
  // General UI states
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form data states
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [doctorData, setDoctorData] = useState({ email: "", password: "" });
  const [patientData, setPatientData] = useState({
    fullName: "",
    email: "",
    password: "",
    aadharNumber: "",
  });
  const [isPatientLogin, setIsPatientLogin] = useState(true);

  const API_BASE = "http://localhost:8080";

  // Helper function for API calls
  const apiCall = async (endpoint, data) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Network response was not ok");
      }
      const json = await response.json();
      setIsLoading(false);
      return json;
    } catch (error) {
      setError(error.message || "Failed to connect to server");
      setIsLoading(false);
      return null;
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* --- Admin login handler --- */
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(adminData.email)) return setError("Invalid email.");
    const res = await apiCall("/admin/auth/login", adminData);

    if (res?.token) {
      const userData = {
        token: res.token,
        role: (res.role || "ADMIN").toUpperCase(),
        email: res.email || adminData.email,
      };
      localStorage.setItem("token", res?.token);
      login(userData);

      if (userData.role === "ADMIN") window.location.href = "/admin/dashboard";
      else if (userData.role === "DOCTOR") window.location.href = "/doctor/dashboard";
      else if (userData.role === "PATIENT") window.location.href = "/patient/dashboard";
      else window.location.href = "/";
    }
  };

  /* --- Doctor login handler --- */
  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(doctorData.email)) return setError("Invalid email.");
    const res = await apiCall("/auth/doctor/login", doctorData);

    if (res?.token) {
      const userData = {
        token: res.token,
        role: (res.role || "DOCTOR").toUpperCase(),
        email: res.email || doctorData.email,
      };
      localStorage.setItem("token", res?.token);
      login(userData);
      navigate("/doctor/dashboard");
    }
  };

  /* --- Patient login handler --- */
  const handlePatientLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(patientData.email)) return setError("Invalid email.");
    const res = await apiCall("/auth/patient/login", patientData);

    if (res?.token) {
      const userData = {
        token: res.token,
        role: (res.role || "PATIENT").toUpperCase(),
        email: res.email || patientData.email,
      };
      localStorage.setItem("token", res?.token);
      login(userData);
      navigate("/patient/dashboard");
    }
  };

  /* --- Patient registration handler --- */
  const handlePatientRegister = async (e) => {
  e.preventDefault();
  setError("");
  
  if (
    !patientData.fullName ||
    !patientData.email ||
    !patientData.password ||
    !patientData.aadharNumber ||
    patientData.aadharNumber.length !== 12
  ) {
    return setError("All fields required. Aadhar number must be 12 digits.");
  }

  console.log(patientData);
  const res = await apiCall("/auth/patient/register", patientData);

  // if backend returns only a message, not a token
  if (res?.token) {
    localStorage.setItem("role", "PATIENT");
    window.location.href = "/patient/dashboard";
  } else {
    alert(res?.message || "Patient registered successfully now you can login");
    window.location.href = "/"; // redirect to login instead
  }
};


  /* --- Portal sections --- */
  const portals = [
    {
      title: "Admin Portal",
      desc: "Manage practitioners & system operations.",
      color: "from-green-700 to-green-900",
      icon: <Shield size={24} />,
      endpoint: "admin",
    },
    {
      title: "Vaidya Login",
      desc: "Practice tools & patient management.",
      color: "from-emerald-600 to-green-500",
      icon: <Stethoscope size={24} />,
      endpoint: "doctor",
    },
    {
      title: "Patient Portal",
      desc: "Personalized plans & progress tracking.",
      color: "from-yellow-500 to-green-600",
      icon: <User size={24} />,
      endpoint: "patient",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />

      {/* Portals Section */}
      <section className="max-w-6xl mx-auto py-16 bg-green-100 font-[Poppins]">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Choose Your <span className="text-green-800">Portal</span>
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {portals.map((p) => (
            <div
              key={p.title}
              className="bg-green-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-green-700 text-white`}
              >
                {p.icon}
              </div>
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{p.desc}</p>
              <button
                onClick={() => setActiveModal(p.endpoint)}
                className={`mt-6 w-full py-3 rounded-2xl text-white font-semibold bg-green-700`}
              >
                {p.title.includes("Admin")
                  ? "Secure Access"
                  : p.title.includes("Vaidya")
                  ? "Practice Dashboard"
                  : "Start Healing"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Ancient Science,{" "}
          <span className="text-green-900">Modern Precision</span>
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Pitta Balance", icon: "🔥" },
            { title: "Kapha Harmony", icon: "💧" },
            { title: "Vata Stability", icon: "🌬️" },
            { title: "Herb Integration", icon: "🍃" },
            { title: "Agni Optimization", icon: "⚡" },
            { title: "Progress Tracking", icon: "📈" },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-green-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="font-semibold">{f.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60"
            onClick={() => {
              setActiveModal(null);
              setError("");
              setSuccess("");
            }}
          />
          <div className="relative bg-green-100 rounded-3xl p-8 max-w-lg w-full shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-black hover:text-black"
            >
              <X size={20} />
            </button>

            {/* Error/Success messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                {success}
              </div>
            )}

            {/* Modals for Admin, Doctor, Patient */}
            {activeModal === "admin" && (
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br from-green-700 to-green-900 text-white mb-3">
                    <Shield />
                  </div>
                  <h3 className="text-2xl font-bold">Admin Portal</h3>
                  <p className="text-sm text-slate-600">
                    Secure system administration
                  </p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <InputField
                    Icon={Mail}
                    type="email"
                    placeholder="Administrator Email"
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData({ ...adminData, email: e.target.value })
                    }
                    disabled={isLoading}
                  />
                  <InputField
                    Icon={Lock}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={adminData.password}
                    onChange={(e) =>
                      setAdminData({ ...adminData, password: e.target.value })
                    }
                    disabled={isLoading}
                    rightElement={{
                      onClick: () => setShowPassword(!showPassword),
                      icon: showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      ),
                    }}
                  />
                  <SubmitButton
                    loading={isLoading}
                    gradient="bg-gradient-to-r from-green-700 to-green-900"
                  >
                    Access Dashboard
                  </SubmitButton>
                </form>
              </>
            )}

            {activeModal === "doctor" && (
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br from-emerald-600 to-green-500 text-white mb-3">
                    <Stethoscope />
                  </div>
                  <h3 className="text-2xl font-bold">Vaidya Portal</h3>
                  <p className="text-sm text-slate-600">Practitioner login</p>
                </div>
                <form onSubmit={handleDoctorLogin} className="space-y-4">
                  <InputField
                    Icon={Mail}
                    type="email"
                    placeholder="Practitioner Email"
                    value={doctorData.email}
                    onChange={(e) =>
                      setDoctorData({ ...doctorData, email: e.target.value })
                    }
                    disabled={isLoading}
                  />
                  <InputField
                    Icon={Lock}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={doctorData.password}
                    onChange={(e) =>
                      setDoctorData({
                        ...doctorData,
                        password: e.target.value,
                      })
                    }
                    disabled={isLoading}
                    rightElement={{
                      onClick: () => setShowPassword(!showPassword),
                      icon: showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      ),
                    }}
                  />
                  <SubmitButton
                    loading={isLoading}
                    gradient="bg-gradient-to-r from-emerald-600 to-green-500"
                  >
                    Access Practice Dashboard
                  </SubmitButton>
                </form>
              </>
            )}

            {activeModal === "patient" && (
              <>
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br from-green-400 to-green-500 text-white mb-3">
                    <Heart />
                  </div>
                  <h3 className="text-2xl font-bold">Wellness Portal</h3>
                  <p className="text-sm text-slate-600">
                    {isPatientLogin
                      ? "Sign in to your account"
                      : "Create your wellness account"}
                  </p>
                </div>
                <div className="flex bg-green-200 rounded-2xl p-1.5 mb-6">
                  <button
                    type="button"
                    className={`flex-1 py-2 rounded-xl font-medium ${
                      isPatientLogin
                        ? "bg-white text-green-700 shadow-md"
                        : "text-slate-600"
                    }`}
                    onClick={() => setIsPatientLogin(true)}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 rounded-xl font-medium ${
                      !isPatientLogin
                        ? "bg-white text-green-700 shadow-md"
                        : "text-slate-600"
                    }`}
                    onClick={() => setIsPatientLogin(false)}
                  >
                    Join Us
                  </button>
                </div>
                <form
                  onSubmit={
                    isPatientLogin ? handlePatientLogin : handlePatientRegister
                  }
                  className="space-y-4"
                >
                  {!isPatientLogin && (
                    <InputField
                      Icon={User}
                      placeholder="Full Name"
                      value={patientData.fullName}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          fullName: e.target.value,
                        })
                      }
                      disabled={isLoading}
                    />
                  )}
                  <InputField
                    Icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={patientData.email}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        email: e.target.value,
                      })
                    }
                    disabled={isLoading}
                  />
                  <InputField
                    Icon={Lock}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={patientData.password}
                    onChange={(e) =>
                      setPatientData({
                        ...patientData,
                        password: e.target.value,
                      })
                    }
                    disabled={isLoading}
                    rightElement={{
                      onClick: () => setShowPassword(!showPassword),
                      icon: showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      ),
                    }}
                  />
                  {!isPatientLogin && (
                    <>
                      <InputField
                        Icon={CreditCard}
                        placeholder="Aadhar Number (12 digits)"
                        value={patientData.aadharNumber}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                           
                            aadharNumber: e.target.value,
                          })
                        }
                        disabled={isLoading}
                      />
                    </>
                  )}
                  <SubmitButton
                    loading={isLoading}
                    gradient="bg-gradient-to-r from-green-600 to-green-700"
                  >
                    {isPatientLogin ? "Sign In" : "Create Account"}
                  </SubmitButton>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}
