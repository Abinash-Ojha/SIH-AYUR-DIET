import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const DoctorPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
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
    if (activeTab === "patients") fetchPatients();
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
     { id: "patients", label: "All Patients", icon: Users, color: "orange" },
    { id: "dashboard", label: "Dashboard", icon: Settings, color: "blue" },
    { id: "search", label: "Search Patient", icon: Search, color: "green" },
    { id: "add-patient", label: "Add Patient", icon: UserPlus, color: "purple" }
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Doctor Dashboard
                </h1>
                <p className="text-sm text-gray-500">Patient Management System</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-1">
            {tabConfig.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative px-6 py-4 flex items-center space-x-3 font-medium transition-all duration-200 ${
                  activeTab === id
                    ? `text-${color}-600 bg-${color}-50 border-b-2 border-${color}-500`
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
                {activeTab === id && (
                  <div className={`absolute inset-0 bg-${color}-500/5 rounded-t-lg`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Enhanced Messages */}
      {message.text && (
        <div className="mx-6 mt-6 animate-in slide-in-from-top-2 duration-300">
          <div
            className={`p-4 rounded-xl shadow-lg border-l-4 ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border-green-500"
                : "bg-red-50 text-red-800 border-red-500"
            }`}
          >
            <div className="flex items-center space-x-2">
              {message.type === "success" ? (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              ) : (
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        </div>
      )}

      <main className="px-6 py-8">
        {/* Enhanced Dashboard */}
        {activeTab === "dashboard" && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center space-x-3 text-white">
                  <Shield size={24} />
                  <h2 className="text-xl font-semibold">Security Settings</h2>
                </div>
              </div>
              
              <form onSubmit={handleChangePassword} className="p-6 space-y-6">
                {["oldPassword", "newPassword"].map((key, index) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12"
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
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword[key === "oldPassword" ? "old" : "new"] ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Search Patient */}
        {activeTab === "search" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <div className="flex items-center space-x-3 text-white">
                  <Search size={24} />
                  <h2 className="text-xl font-semibold">Patient Search</h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <form onSubmit={handleSearchByAadhar} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search by Aadhar Number
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Enter 12-digit Aadhar number"
                          value={aadharSearch}
                          onChange={(e) => setAadharSearch(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>

                  <form onSubmit={handleSearchById} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search by Patient ID
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Enter Patient ID"
                          value={patientIdSearch}
                          onChange={(e) => setPatientIdSearch(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {searchedPatient && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <User size={20} />
                      <span>Patient Details</span>
                    </h3>
                    <div className="bg-white rounded-lg p-4 border">
                      <pre className="text-sm text-gray-600 whitespace-pre-wrap overflow-x-auto">
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
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-4">
                <div className="flex items-center space-x-3 text-white">
                  <UserPlus size={24} />
                  <div>
                    <h2 className="text-xl font-semibold">Add New Patient</h2>
                    <p className="text-purple-100 text-sm">Complete patient registration form</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddPatient} className="p-6">
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
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <Database size={24} />
                    <div>
                      <h2 className="text-xl font-semibold">Patient Database</h2>
                      <p className="text-orange-100 text-sm">{patients.length} patients registered</p>
                    </div>
                  </div>
                  {loading && (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Patient ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Patient Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.length > 0 ? (
                      patients.map((patient, index) => (
                        <tr
                          key={patient.id}
                          className={`hover:bg-orange-50 transition-colors duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                                {patient.id?.toString().slice(-2) || "NA"}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  #{patient.id}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {patient.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="font-semibold text-gray-900">
                                {patient.fullName || "N/A"}
                              </div>
                              <div className="text-gray-500">
                                {patient.age ? `${patient.age} years old` : "Age not specified"}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {patient.email || "No email provided"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {patient.gender || "Gender not specified"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-3">
                              <button
                                onClick={() => navigate("/model-response")}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <Eye size={16} className="mr-2" />
                                Make Analysis
                              </button>
                              
                              <button
                                onClick={() => handleDeletePatient(patient.id)}
                                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <Users size={32} className="text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">No patients found</h3>
                              <p className="text-gray-500 mt-1">
                                Start by adding your first patient to the system.
                              </p>
                            </div>
                            <button
                              onClick={() => setActiveTab("add-patient")}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              <UserPlus size={16} className="mr-2" />
                              Add First Patient
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {patients.length > 0 && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Database size={16} />
                      <span>Total: {patients.length} patient{patients.length !== 1 ? 's' : ''}</span>
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