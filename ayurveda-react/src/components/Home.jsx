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
  Sparkles,
  ArrowRight,
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
  <div className="relative group">
    <Icon className="absolute left-4 top-4 text-violet-500 group-focus-within:text-violet-600 transition-colors duration-300 z-10" size={20} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full pl-14 pr-14 py-4 border-2 border-slate-200/60 rounded-2xl focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium text-slate-700 placeholder:text-slate-400 shadow-lg hover:shadow-xl hover:bg-white group-focus-within:bg-white"
    />
    {rightElement && (
      <button
        type="button"
        onClick={rightElement.onClick}
        className="absolute right-4 top-4 text-slate-400 hover:text-violet-600 transition-colors duration-200 z-10"
        tabIndex={-1}
      >
        {rightElement.icon}
      </button>
    )}
    {/* Animated border */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
  </div>
);

/* --- Reusable Submit Button --- */
const SubmitButton = ({ loading, children, gradient }) => (
  <button
    type="submit"
    disabled={loading}
    className={`group relative w-full ${gradient} text-white py-4 rounded-2xl 
                hover:scale-[1.02] shadow-xl hover:shadow-2xl font-semibold text-sm tracking-wider uppercase
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                overflow-hidden`}
  >
    {/* Animated background */}
    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
    
    {loading ? (
      <div className="flex items-center justify-center gap-2 relative z-10">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        {children}...
      </div>
    ) : (
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
      </span>
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
        throw new Error(errorData.message||"username or password is wrong");
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
    // store full backend object
    login(res);

    // redirect to dashboard
    window.location.href = "/admin/dashboard";
  }
};

/* --- Doctor login handler --- */
const handleDoctorLogin = async (e) => {
  e.preventDefault();
  setError("");
  if (!validateEmail(doctorData.email)) return setError("Invalid email.");

  const res = await apiCall("/auth/doctor/login", doctorData);

  if (res?.token) {
    // store full backend object
    login(res);

    window.location.href = "/doctor/dashboard";
  }
};

/* --- Patient login handler --- */
const handlePatientLogin = async (e) => {
  e.preventDefault();
  setError("");
  if (!validateEmail(patientData.email)) return setError("Invalid email.");

  const res = await apiCall("/auth/patient/login", patientData);

  if (res?.token) {
    // store full backend object
    login(res);

    window.location.href = "/patient/dashboard";
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

  const res = await apiCall("/auth/patient/register", patientData);

  if (res?.token) {
    // store full backend object
    login(res);
    window.location.href = "/patient/dashboard";
  } else {
    alert(res?.message || "Patient registered successfully, now you can login");
    window.location.href = "/";
  }
};


  /* --- Portal sections --- */
  const portals = [
    {
      title: "Admin Portal",
      desc: "System administration and practitioner management with advanced analytics.",
      color: "from-slate-800 via-gray-900 to-black",
      hoverColor: "hover:from-slate-700 hover:via-gray-800 hover:to-slate-900",
      icon: <Shield size={24} />,
      endpoint: "admin",
      bgGradient: "from-slate-900/10 to-gray-900/20",
      accentColor: "bg-slate-500/20",
    },
    {
      title: "Doctor Portal",
      desc: "Advanced practice management with AI-powered patient insights and care tools.",
      color: "from-emerald-600 via-teal-600 to-cyan-600",
      hoverColor: "hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500",
      icon: <Stethoscope size={24} />,
      endpoint: "doctor",
      bgGradient: "from-emerald-500/10 to-teal-500/20",
      accentColor: "bg-emerald-500/20",
    },
    {
      title: "Patient Portal",
      desc: "Personalized wellness journey with real-time health monitoring and nutrition plans.",
      color: "from-violet-600 via-purple-600 to-indigo-600",
      hoverColor: "hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500",
      icon: <Heart size={24} />,
      endpoint: "patient",
      bgGradient: "from-violet-500/10 to-purple-500/20",
      accentColor: "bg-violet-500/20",
    },
  ];

  return (
    <>
   <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-violet-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-violet-600/10 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <Hero />

      {/* Portals Section */}
     <section className="relative w-full py-24 bg-gradient-to-b from-white/80 to-slate-50/80 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-violet-500" size={24} />
            <span className="text-violet-600 font-semibold tracking-wider text-sm uppercase">Access Portals</span>
            <Sparkles className="text-violet-500" size={24} />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-violet-700 to-slate-800 bg-clip-text text-transparent mb-6">
            Choose Your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Portal</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Experience next-generation Ayurvedic healthcare with intelligent insights, personalized care, and seamless digital integration</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-10">
          {portals.map((p, index) => (
            <div
              key={p.title}
              className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/50 overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${p.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Decorative elements */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${p.accentColor} rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700`} />
              <div className={`absolute bottom-0 left-0 w-24 h-24 ${p.accentColor} rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 bg-gradient-to-br ${p.color} text-white shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-300`}
                >
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900">{p.title}</h3>
                <p className="text-slate-600 mb-10 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{p.desc}</p>
                <button
                  onClick={() => setActiveModal(p.endpoint)}
                  className={`relative w-full py-4 rounded-2xl text-white font-semibold bg-gradient-to-r ${p.color} ${p.hoverColor} shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 overflow-hidden group/btn`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Access Portal
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Features Section */}
       <section className="relative w-full py-24 bg-gradient-to-b from-slate-50/80 to-white/80 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-600 font-semibold tracking-wider text-sm uppercase">Platform Features</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-slate-800 bg-clip-text text-transparent mb-6">
            Ancient Wisdom, <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Modern Technology</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Revolutionary healthcare solutions combining traditional Ayurvedic principles with cutting-edge artificial intelligence and data analytics</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Dosha Analysis", icon: "🔥", color: "from-orange-500 via-red-500 to-pink-500", desc: "AI-powered constitutional assessment" },
            { title: "Nutrition Planning", icon: "🍃", color: "from-emerald-500 via-green-500 to-teal-500", desc: "Personalized meal recommendations" },
            { title: "Progress Tracking", icon: "📈", color: "from-blue-500 via-indigo-500 to-purple-500", desc: "Real-time health monitoring" },
            { title: "Herbal Integration", icon: "🌿", color: "from-green-500 via-emerald-500 to-teal-600", desc: "Traditional remedy matching" },
            { title: "Lifestyle Guidance", icon: "⚡", color: "from-purple-500 via-violet-500 to-pink-500", desc: "Holistic wellness coaching" },
            { title: "Health Monitoring", icon: "💊", color: "from-cyan-500 via-blue-500 to-indigo-600", desc: "Continuous vitals tracking" },
          ].map((f, index) => (
            <div
              key={f.title}
              className="group relative bg-white/60 backdrop-blur-lg rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/40 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${f.color} rounded-full animate-bounce`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                      animationDelay: `${i * 200}ms`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${f.color} flex items-center justify-center text-3xl shadow-2xl group-hover:shadow-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {f.icon}
                </div>
                <h4 className="font-bold text-slate-800 text-xl mb-3 group-hover:text-slate-900 transition-colors duration-300">{f.title}</h4>
                <p className="text-slate-600 text-sm group-hover:text-slate-700 transition-colors duration-300">{f.desc}</p>
              </div>
              
              {/* Corner decorations */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${f.color} opacity-10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700`} />
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-lg"
            onClick={() => {
              setActiveModal(null);
              setError("");
              setSuccess("");
            }}
          />
          <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-10 max-w-lg w-full shadow-2xl z-10 max-h-[90vh] overflow-y-auto border border-white/50">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-3xl" />
            
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors duration-200 p-2 hover:bg-slate-100 rounded-full"
            >
              <X size={24} />
            </button>

            {/* Error/Success messages */}
            {error && (
              <div className="relative mb-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 rounded-2xl text-red-700 text-sm shadow-lg backdrop-blur-sm">
                <div className="absolute inset-0 bg-red-500/5 rounded-2xl" />
                <span className="relative z-10">{error}</span>
              </div>
            )}
            {success && (
              <div className="relative mb-6 p-5 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50 rounded-2xl text-emerald-700 text-sm shadow-lg backdrop-blur-sm">
                <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl" />
                <span className="relative z-10">{success}</span>
              </div>
            )}

            {/* Admin Modal */}
            {activeModal === "admin" && (
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <div className="mx-auto w-24 h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br from-slate-800 via-gray-900 to-black text-white mb-6 shadow-2xl">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-gray-900 bg-clip-text text-transparent mb-3">Admin Portal</h3>
                  <p className="text-slate-600 text-lg">System administration access</p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-6">
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
                      icon: showPassword ? <EyeOff size={18} /> : <Eye size={18} />,
                    }}
                  />
                  <SubmitButton
                    loading={isLoading}
                    gradient="bg-gradient-to-r from-slate-800 via-gray-900 to-black"
                  >
                    Access Dashboard
                  </SubmitButton>
                </form>
              </div>
            )}

            {/* Doctor Modal */}
            {activeModal === "doctor" && (
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <div className="mx-auto w-24 h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white mb-6 shadow-2xl">
                    <Stethoscope size={32} />
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">Doctor Portal</h3>
                  <p className="text-slate-600 text-lg">Practitioner login</p>
                </div>
                <form onSubmit={handleDoctorLogin} className="space-y-6">
                  <InputField
                    Icon={Mail}
                    type="email"
                    placeholder="Doctor Email"
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
                      setDoctorData({ ...doctorData, password: e.target.value })
                    }
                    disabled={isLoading}
                    rightElement={{
                      onClick: () => setShowPassword(!showPassword),
                      icon: showPassword ? <EyeOff size={18} /> : <Eye size={18} />,
                    }}
                  />
                  <SubmitButton
                    loading={isLoading}
                    gradient="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"
                  >
                    Access Practice Dashboard
                  </SubmitButton>
                </form>
              </div>
            )}

            {/* Patient Modal */}
            {activeModal === "patient" && (
              <div className="relative z-10">
                <div className="text-center mb-10">
                  <div className="mx-auto w-24 h-24 rounded-3xl flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white mb-6 shadow-2xl">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3">Patient Portal</h3>
                  <p className="text-slate-600 text-lg">
                    {isPatientLogin ? "Sign in to your account" : "Create your wellness account"}
                  </p>
                </div>
                <div className="flex bg-gradient-to-r from-slate-100 to-violet-100/50 rounded-2xl p-2 mb-8 backdrop-blur-sm">
                  <button
                    type="button"
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      isPatientLogin
                        ? "bg-white text-slate-700 shadow-lg scale-105"
                        : "text-slate-500 hover:text-slate-600 hover:bg-white/50"
                    }`}
                    onClick={() => setIsPatientLogin(true)}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      !isPatientLogin
                        ? "bg-white text-slate-700 shadow-lg scale-105"
                        : "text-slate-500 hover:text-slate-600 hover:bg-white/50"
                    }`}
                    onClick={() => setIsPatientLogin(false)}
                  >
                    Register
                  </button>
                </div>
                <form
                  onSubmit={isPatientLogin ? handlePatientLogin : handlePatientRegister}
                  className="space-y-6"
                >
                  {!isPatientLogin && (
                    <InputField
                      Icon={User}
                      placeholder="Full Name"
                      value={patientData.fullName}
                      onChange={(e) =>
                        setPatientData({ ...patientData, fullName: e.target.value })
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
                      setPatientData({ ...patientData, email: e.target.value })
                    }
                    disabled={isLoading}
                  />
                  <InputField
                    Icon={Lock}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={patientData.password}
                    onChange={(e) =>
                      setPatientData({ ...patientData, password: e.target.value })
                    }
                    disabled={isLoading}
                    rightElement={{
                      onClick: () => setShowPassword(!showPassword),
                      icon: showPassword ? <EyeOff size={18} /> : <Eye size={18} />,
                    }}
                  />
                  {!isPatientLogin && (
                    <InputField
                      Icon={CreditCard}
                      placeholder="Aadhar Number (12 digits)"
                      value={patientData.aadharNumber}
                      onChange={(e) =>
                        setPatientData({ ...patientData, aadharNumber: e.target.value })
                      }
                      disabled={isLoading}
                    />
                  )}
                  <SubmitButton
                    loading={isLoading}
                    gradient="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"
                  >
                    {isPatientLogin ? "Sign In" : "Create Account"}
                  </SubmitButton>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      </div>
    </>
  );
}