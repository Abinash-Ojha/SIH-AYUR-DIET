import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  Search,
  Plus,
  Users,
  Settings,
  Trash2,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  Activity,
  Heart,
  MapPin,
  Target,
  Utensils,
  Dumbbell,
  Clock,
  Shield,
  LogOut,
  UserPlus,
  Database,
  Stethoscope,
  Bell,
  Home,
  FileText,
  BarChart3,
  Menu
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AccessDenied from "./AccessDenied";

const DoctorPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [searchedPatient, setSearchedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [expandedSections, setExpandedSections] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState({ old: false, new: false });
  const [aadharSearch, setAadharSearch] = useState("");
  const [patientIdSearch, setPatientIdSearch] = useState("");
  const [newPatientForm, setNewPatientForm] = useState({
    fullName: "",
    age: "",
    email: "",
    gender: "",
    height: "",
    weight: "",
    bmi: "",
    bodyFatPercentage: "",
    activityLevel: "",
    occupationType: "",
    existingConditions: "",
    medications: "",
    allergies: "",
    sleepQuality: "",
    stressLevel: "",
    digestion: "",
    waterIntake: "",
    addictions: "",
    prakritiType: "",
    vikruti: "",
    agni: "",
    bowelHabits: "",
    sleepPattern: "",
    appetite: "",
    season: "",
    geographicLocation: "",
    emotionalTendencies: "",
    dietType: "",
    cuisinePreference: "",
    mealFrequency: "",
    favoriteFoods: "",
    dislikedFoods: "",
    cookingMethods: "",
    budgetAccess: "",
    calorieTarget: "",
    macronutrientSplit: "",
    micronutrientFocus: "",
    goalType: "",
    medicalGoals: "",
    athleticPerformance: "",
    wellnessGoals: "",
    country: "",
    state: "",
    city: "",
    climate: "",
    foodIntolerances: "",
    medicalConditions: "",
    bowelMovements: "",
    energyLevels: "",
    mentalWorkload: "",
    bodyFrame: "",
    muscleTone: "",
    skinType: "",
    hairType: "",
    voiceQuality: "",
    temperaturePreference: "",
    sweatPattern: "",
    occupation: "",
    workoutType: "",
    workoutIntensity: "",
    workoutFrequency: "",
    smoking: false,
    alcohol: "",
    caffeineIntake: "",
    consultationDate: "",
  });

  const navigate = useNavigate();
  const API_BASE = "/auth/patients";

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/auth/doctor/changePassword", passwordForm);
      showMessage("success", "Password changed successfully");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      showMessage(
        "error",
        err.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  const searchPatient = async (url, query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.get(url);
      setSearchedPatient(res.data);
      showMessage("success", "Patient found");
    } catch (err) {
      setSearchedPatient(null);
      showMessage("error", err.response?.data?.message || "Patient not found");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByAadhar = (e) => {
    e.preventDefault();
    searchPatient(`${API_BASE}/details/${aadharSearch}`, aadharSearch);
  };

  const handleSearchById = (e) => {
    e.preventDefault();
    searchPatient(`${API_BASE}/${patientIdSearch}`, patientIdSearch);
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`${API_BASE}/register`, newPatientForm);
      showMessage("success", "Patient added successfully");
      setNewPatientForm({});
      fetchPatients();
    } catch (err) {
      showMessage(
        "error",
        err.response?.data?.message || "Failed to add patient"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${API_BASE}/allPatients`);
      setPatients(res.data);
    } catch (err) {
      showMessage(
        "error",
        err.response?.data?.message || "Failed to fetch patients"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) return;
    setLoading(true);
    try {
      await api.delete(`${API_BASE}/delete/${id}`);
      showMessage("success", "Patient deleted");
      fetchPatients();
    } catch (err) {
      showMessage("error", err.response?.data?.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "patients" || activeTab === "dashboard") fetchPatients();
  }, [activeTab]);

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const formSections = [
    {
      key: "basic",
      title: "Personal Information",
      icon: User,
      color: "blue",
      fields: [
        { name: "fullName", label: "Full Name", required: true },
        { name: "age", label: "Age", type: "number", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "gender", label: "Gender", required: true },
      ]
    },
    {
      key: "medical",
      title: "Physical & Medical Assessment",
      icon: Heart,
      color: "red",
      fields: [
        { name: "height", label: "Height (cm)", type: "number" },
        { name: "weight", label: "Weight (kg)", type: "number" },
        { name: "bmi", label: "BMI" },
        { name: "bodyFatPercentage", label: "Body Fat Percentage (%)" },
        { name: "existingConditions", label: "Existing Medical Conditions" },
        { name: "medications", label: "Current Medications" },
        { name: "allergies", label: "Known Allergies" },
        { name: "foodIntolerances", label: "Food Intolerances" },
      ]
    },
    {
      key: "lifestyle",
      title: "Lifestyle & Daily Habits",
      icon: Activity,
      color: "green",
      fields: [
        { name: "sleepQuality", label: "Sleep Quality (1-10)" },
        { name: "stressLevel", label: "Stress Level (1-10)" },
        { name: "digestion", label: "Digestion Quality" },
        { name: "waterIntake", label: "Daily Water Intake (Liters)" },
        { name: "addictions", label: "Addictions/Dependencies" },
        { name: "occupationType", label: "Occupation Type" },
        { name: "activityLevel", label: "Activity Level" },
        { name: "energyLevels", label: "Energy Levels" },
      ]
    },
    {
      key: "ayurveda",
      title: "Ayurvedic Constitution",
      icon: Shield,
      color: "orange",
      fields: [
        { name: "prakritiType", label: "Prakriti (Constitution) Type" },
        { name: "vikruti", label: "Vikruti (Current Imbalance)" },
        { name: "agni", label: "Agni (Digestive Fire)" },
        { name: "bowelHabits", label: "Bowel Movement Patterns" },
        { name: "sleepPattern", label: "Sleep Pattern" },
        { name: "appetite", label: "Appetite Level" },
        { name: "emotionalTendencies", label: "Emotional Tendencies" },
      ]
    },
    {
      key: "diet",
      title: "Nutrition & Dietary Preferences",
      icon: Utensils,
      color: "yellow",
      fields: [
        { name: "dietType", label: "Diet Type (Veg/Non-veg/Vegan)" },
        { name: "cuisinePreference", label: "Cuisine Preference" },
        { name: "favoriteFoods", label: "Favorite Foods" },
        { name: "dislikedFoods", label: "Foods to Avoid" },
        { name: "cookingMethods", label: "Preferred Cooking Methods" },
        { name: "mealFrequency", label: "Meal Frequency per Day" },
        { name: "calorieTarget", label: "Daily Calorie Target" },
        { name: "macronutrientSplit", label: "Macronutrient Distribution" },
        { name: "micronutrientFocus", label: "Micronutrient Focus Areas" },
      ]
    },
    {
      key: "goals",
      title: "Health & Wellness Goals",
      icon: Target,
      color: "purple",
      fields: [
        { name: "goalType", label: "Primary Goal Type" },
        { name: "medicalGoals", label: "Medical/Therapeutic Goals" },
        { name: "athleticPerformance", label: "Athletic Performance Goals" },
        { name: "wellnessGoals", label: "General Wellness Goals" },
      ]
    },
    {
      key: "location",
      title: "Geographic & Environmental",
      icon: MapPin,
      color: "teal",
      fields: [
        { name: "country", label: "Country" },
        { name: "state", label: "State/Province" },
        { name: "city", label: "City" },
        { name: "climate", label: "Climate Type" },
        { name: "geographicLocation", label: "Geographic Region" },
        { name: "budgetAccess", label: "Budget Range" },
      ]
    },
    {
      key: "traits",
      title: "Physical Characteristics",
      icon: User,
      color: "indigo",
      fields: [
        { name: "mentalWorkload", label: "Mental Workload Level" },
        { name: "bodyFrame", label: "Body Frame Type" },
        { name: "muscleTone", label: "Muscle Tone" },
        { name: "skinType", label: "Skin Type" },
        { name: "hairType", label: "Hair Type" },
        { name: "voiceQuality", label: "Voice Quality" },
        { name: "temperaturePreference", label: "Temperature Preference" },
        { name: "sweatPattern", label: "Sweating Pattern" },
      ]
    },
    {
      key: "workout",
      title: "Exercise & Substance Use",
      icon: Dumbbell,
      color: "pink",
      fields: [
        { name: "occupation", label: "Current Occupation" },
        { name: "workoutType", label: "Preferred Exercise Type" },
        { name: "workoutIntensity", label: "Exercise Intensity" },
        { name: "workoutFrequency", label: "Exercise Frequency (per week)" },
        { name: "smoking", label: "Smoking Status" },
        { name: "alcohol", label: "Alcohol Consumption" },
        { name: "caffeineIntake", label: "Daily Caffeine Intake" },
      ]
    },
    {
      key: "consultation",
      title: "Consultation Details",
      icon: Calendar,
      color: "gray",
      fields: [
        { name: "consultationDate", label: "Consultation Date", type: "date" },
      ]
    }
  ];

  const renderFormSection = (section) => {
    const isExpanded = expandedSections[section.key];
    const Icon = section.icon;
    
    return (
      <div key={section.key} className="mb-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection(section.key)}
          className={`w-full px-6 py-4 bg-gradient-to-r from-${section.color}-50 to-${section.color}-100 hover:from-${section.color}-100 hover:to-${section.color}-200 flex justify-between items-center text-left font-semibold text-${section.color}-800 transition-all duration-200`}
        >
          <div className="flex items-center space-x-3">
            <Icon size={20} className={`text-${section.color}-600`} />
            <span>{section.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {section.fields.length} fields
            </span>
            {isExpanded ? 
              <ChevronUp size={20} className={`text-${section.color}-600`} /> : 
              <ChevronDown size={20} className={`text-${section.color}-600`} />
            }
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type={field.type || "text"}
                    value={newPatientForm[field.name] || ""}
                    onChange={(e) =>
                      setNewPatientForm((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required={field.required}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabConfig = [
    { id: "dashboard", label: "Dashboard", icon: Home, color: "blue" },
    { id: "patients", label: "All Patients", icon: Users, color: "orange" },
    { id: "search", label: "Search Patient", icon: Search, color: "green" },
    { id: "add-patient", label: "Add Patient", icon: UserPlus, color: "purple" },
     { id: "changePassword", label: "Change Password", icon: Shield, color: "purple" }
  ];

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  console.log("User object:", user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Professional Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="text-white" size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                  Doctor Dashboard
                </h1>
                <p className="text-sm text-gray-500 font-medium">Patient Management Portal</p>
              </div>
            </div>

            {/* Professional Welcome Section */}
            <div className="flex items-center space-x-6">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>

              {/* Doctor Welcome Card */}
              <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-xl border border-blue-200/50 shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="text-white" size={18} />
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-600 font-medium">
                    {getCurrentTime()},
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    Dr. {user?.name || "Doctor"}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {tabConfig.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative px-6 py-4 flex items-center space-x-3 font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                  activeTab === id
                    ? `text-${color}-700 bg-${color}-50/80 border-b-3 border-${color}-500 shadow-sm`
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50/80"
                }`}
              >
                <Icon size={18} className={activeTab === id ? `text-${color}-600` : 'text-gray-500'} />
                <span>{label}</span>
                {activeTab === id && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 rounded-t-lg pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Enhanced Messages */}
      {message.text && (
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="animate-in slide-in-from-top-2 duration-300">
            <div
              className={`p-4 rounded-xl shadow-lg border-l-4 backdrop-blur-sm ${
                message.type === "success"
                  ? "bg-green-50/90 text-green-800 border-green-500"
                  : "bg-red-50/90 text-red-800 border-red-500"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <span className="font-semibold">{message.text}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Professional Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">
                    Welcome back, Dr. {user?.name || "Doctor"}!
                  </h2>
                  <p className="text-blue-100 text-lg">
                    {getCurrentTime()}! Ready to help your patients today?
                  </p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                      <Calendar className="text-blue-200" size={18} />
                      <span className="text-blue-100">{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                      <Clock className="text-blue-200" size={18} />
                      <span className="text-blue-100">{new Date().toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Stethoscope size={64} className="text-white/80" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Patients</p>
                    <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                    <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Calendar className="text-green-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FileText className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Top 5 Recent Patients */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <Users size={28} />
                    <div>
                      <h3 className="text-2xl font-bold">Recent Patients</h3>
                      <p className="text-indigo-100">Top 5 recently added patients</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("patients")}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>

              <div className="p-8">
                {patients.length > 0 ? (
                  <div className="space-y-4">
                    {patients.slice(0, 5).map((patient, index) => (
                      <div
                        key={patient.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                            {patient.fullName?.charAt(0)?.toUpperCase() || patient.id?.toString().slice(-2) || "P"}
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900">
                              {patient.fullName || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: #{patient.id} • {patient.age ? `${patient.age} years` : "Age N/A"} • {patient.gender || "Gender N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.email || "No email"}
                            </div>
                            <div className="text-xs text-gray-500">
                              Patient #{index + 1}
                            </div>
                          </div>
                          <button
                            onClick={() => navigate("/model-response")}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <BarChart3 size={16} className="mr-2 inline" />
                            Analyze
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                      <Users size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No patients yet</h3>
                    <p className="text-gray-500 mb-6">
                      Start by adding your first patient to see them here.
                    </p>
                    <button
                      onClick={() => setActiveTab("add-patient")}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
                    >
                      <UserPlus size={18} className="mr-2" />
                      Add First Patient
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "changePassword" && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-4">
                <div className="flex items-center space-x-3 text-white">
                  <Shield size={28} />
                  <div>
                    <h3 className="text-2xl font-bold">Security Settings</h3>
                    <p className="text-blue-100">Manage your account security</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="p-8">
                <div className="max-w-2xl space-y-6">
                  {["oldPassword", "newPassword"].map((key) => (
                    <div key={key} className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        {key === "oldPassword" ? "Current Password" : "New Password"}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword[key === "oldPassword" ? "old" : "new"] ? "text" : "password"}
                          value={passwordForm[key]}
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12 bg-gray-50/50"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              [key === "oldPassword" ? "old" : "new"]: !prev[key === "oldPassword" ? "old" : "new"],
                            }))
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword[key === "oldPassword" ? "old" : "new"] ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Updating Password...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Shield size={20} />
                        <span>Update Password</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Search Patient */}
        {activeTab === "search" && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <div className="flex items-center space-x-3 text-white">
                  <Search size={28} />
                  <div>
                    <h2 className="text-2xl font-bold">Patient Search</h2>
                    <p className="text-green-100">Find patients using Aadhar or Patient ID</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <form onSubmit={handleSearchByAadhar} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Search by Aadhar Number
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Enter 12-digit Aadhar number"
                          value={aadharSearch}
                          onChange={(e) => setAadharSearch(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50/50"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>

                  <form onSubmit={handleSearchById} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Search by Patient ID
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Enter Patient ID"
                          value={patientIdSearch}
                          onChange={(e) => setPatientIdSearch(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50/50"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {searchedPatient && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                      <User size={24} />
                      <span>Patient Details</span>
                    </h3>
                    <div className="bg-white rounded-xl p-6 border shadow-sm">
                      <pre className="text-sm text-gray-600 whitespace-pre-wrap overflow-x-auto font-mono">
                        {JSON.stringify(searchedPatient, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Add Patient Form */}
        {activeTab === "add-patient" && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-6">
                <div className="flex items-center space-x-3 text-white">
                  <UserPlus size={28} />
                  <div>
                    <h2 className="text-2xl font-bold">Add New Patient</h2>
                    <p className="text-purple-100">Complete patient registration form</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddPatient} className="p-8">
                <div className="space-y-6">
                  {formSections.map(renderFormSection)}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Adding Patient...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <UserPlus size={20} />
                        <span>Add Patient to System</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Patients Table */}
        {activeTab === "patients" && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <Database size={28} />
                    <div>
                      <h2 className="text-2xl font-bold">Patient Database</h2>
                      <p className="text-orange-100">{patients.length} patients registered in the system</p>
                    </div>
                  </div>
                  {loading && (
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Patient Information
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Contact Details
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Basic Info
                      </th>
                      <th className="px-8 py-5 text-center text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.length > 0 ? (
                      patients.map((patient, index) => (
                        <tr
                          key={patient.id}
                          className={`hover:bg-orange-50/50 transition-colors duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                          }`}
                        >
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                                {patient.fullName?.charAt(0)?.toUpperCase() || patient.id?.toString().slice(-2) || "P"}
                              </div>
                              <div>
                                <div className="text-lg font-bold text-gray-900">
                                  {patient.fullName || "N/A"}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Patient ID: #{patient.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="font-semibold text-gray-900">
                                {patient.email || "No email provided"}
                              </div>
                              <div className="text-gray-500">
                                Contact information
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="font-semibold text-gray-900">
                                {patient.age ? `${patient.age} years old` : "Age not specified"}
                              </div>
                              <div className="text-gray-500">
                                {patient.gender || "Gender not specified"}
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-3">
                              <button
                                onClick={() => navigate("/model-response")}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <BarChart3 size={16} className="mr-2" />
                                Analyze
                              </button>
                              
                              <button
                                onClick={() => handleDeletePatient(patient.id)}
                                className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-8 py-16 text-center">
                          <div className="flex flex-col items-center space-y-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                              <Users size={40} className="text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">No patients found</h3>
                              <p className="text-gray-500 mb-6">
                                Start building your patient database by adding your first patient.
                              </p>
                              <button
                                onClick={() => setActiveTab("add-patient")}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
                              >
                                <UserPlus size={18} className="mr-2" />
                                Add First Patient
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {patients.length > 0 && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Database size={18} />
                      <span className="font-semibold">Total: {patients.length} patient{patients.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorPage;