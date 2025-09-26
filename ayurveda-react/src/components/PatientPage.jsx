import React, { useState, useEffect } from 'react';
import { 
  User, 
  Activity, 
  Target,
  ChevronDown,
  ChevronRight,
  Heart,
  Droplets,
  Scale,
  Clock,
  Apple,
  Flame,
  Shield, 
  AlertTriangle, 
  AlertCircle,
  CheckCircle,
  Calendar,
  UserCheck,
  Loader2,
  Search,
  Info,
  Utensils,
  Moon,
  Sun,
  LogOut,
  Download,
  PrinterIcon,
  Share2,
  Bell,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';

const PatientPage = () => {
  const [token, setToken] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedDays, setExpandedDays] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  const API_BASE_URL = 'http://localhost:8080/api/responses';

  // Toggle functions
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleDay = (day) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const fetchPlanByToken = async () => {
    if (!token.trim()) {
      setError('Please enter a valid access token');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('Please login first');
      }
      
      const user = JSON.parse(userData);
      const jwtToken = user.token;
      
      if (!jwtToken) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`${API_BASE_URL}/getPlan/token/${token}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        } else if (response.status === 403) {
          throw new Error('Access forbidden. You may not have permission to view this plan.');
        } else if (response.status === 404) {
          throw new Error('No plan found for this token.');
        } else {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }
      }
      
      const data = await response.json();
      setResponseData(data);
      setExpandedSections({
        basicInfo: true,
        dosha: true
      });
      setActiveTab('overview');
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setResponseData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const renderHeader = () => (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Patient Dashboard</h1>
              <p className="text-blue-200 text-sm">Personalized Diet Planning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-xl p-2">
              <Bell className="h-5 w-5 text-white" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-xl p-2">
              <Share2 className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500/80 backdrop-blur-sm hover:bg-red-600 transition-all duration-300 rounded-xl px-4 py-2 text-white font-medium flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSearchSection = () => (
    <div className="bg-white/70 backdrop-blur-xl rounded-1xl shadow-xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Access Your Diet Plan</h2>
        <p className="text-gray-600 text-lg">Enter your secure access token to view your personalized nutrition plan</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your access token..."
            className="w-full px-6 py-4 pl-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg shadow-lg"
            onKeyPress={(e) => e.key === 'Enter' && fetchPlanByToken()}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        
        <button
          onClick={fetchPlanByToken}
          disabled={loading}
          className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin mr-3" />
              Loading Your Plan...
            </>
          ) : (
            <>
              <Search className="h-6 w-6 mr-3" />
              Get My Personalized Plan
            </>
          )}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl flex items-center shadow-lg">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabNavigation = () => (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-2 border border-white/20">
      <div className="flex space-x-2">
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'analysis', label: 'Health Analysis', icon: Activity },
          { id: 'plan', label: 'Diet Plan', icon: Utensils },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-800'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPatientInfo = () => {
    if (!responseData?.patient && !responseData?.doctor) return null;

    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-1xl  shadow-xl p-8 border border-white/20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Award className="mr-3 h-8 w-8 text-blue-600" />
            Your Diet Plan Overview
          </h2>
          <div className="flex space-x-2">
            <button className="bg-blue-100 hover:bg-blue-200 transition-colors duration-300 rounded-xl p-2">
              <Download className="h-5 w-5 text-blue-600" />
            </button>
            <button className="bg-green-100 hover:bg-green-200 transition-colors duration-300 rounded-xl p-2">
              <PrinterIcon className="h-5 w-5 text-green-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {responseData.patient && (
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-lg">
              <h3 className="font-bold text-blue-800 mb-6 flex items-center text-lg">
                <User className="mr-3 h-6 w-6" />
                Patient Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900 font-semibold">{responseData.patient.fullName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900">{responseData.patient.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Patient ID:</span>
                  <span className="text-gray-900 font-mono text-sm bg-white px-2 py-1 rounded">{responseData.patient.id}</span>
                </div>
              </div>
            </div>
          )}
          
          {responseData.doctor && (
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 shadow-lg">
              <h3 className="font-bold text-green-800 mb-6 flex items-center text-lg">
                <UserCheck className="mr-3 h-6 w-6" />
                Your Healthcare Provider
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Doctor:</span>
                  <span className="text-gray-900 font-semibold">Dr. {responseData.doctor.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900">{responseData.doctor.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Specialization:</span>
                  <span className="text-gray-900 font-medium">{responseData.doctor.specialization}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-200">
              <Calendar className="h-6 w-6 text-indigo-600 mr-3" />
              <div>
                <span className="text-sm text-gray-600 block">Plan Created</span>
                <span className="font-semibold text-gray-900">
                  {new Date(responseData.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            
            {responseData.doctorsRemark && (
              <div className="flex-1 min-w-0 bg-white p-4 rounded-1xl shadow-sm border border-gray-200">
                <div className="flex items-start">
                  <Info className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Doctor's Note:</p>
                    <p className="text-gray-600 leading-relaxed">{responseData.doctorsRemark}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAnalysisData = () => {
    if (!responseData?.analysis) return null;

    const analysis = responseData.analysis;

    const sections = [
      {
        key: 'basicInfo',
        title: 'Health Profile',
        icon: User,
        color: 'blue',
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Age', value: `${analysis.basic_info.age} years`, icon: Clock },
                { label: 'Gender', value: analysis.basic_info.gender, icon: User },
                { label: 'Weight', value: `${analysis.basic_info.weight} kg`, icon: Scale },
                { label: 'Height', value: `${analysis.basic_info.height} cm`, icon: TrendingUp },
              ].map((item, idx) => (
                <div key={idx} className="text-center p-6 bg-white rounded-1xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <item.icon className="h-10 w-10 mx-auto text-blue-600 mb-3" />
                  <span className="text-sm text-gray-600 block font-medium mb-2">{item.label}</span>
                  <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-1xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Heart className="h-10 w-10 mx-auto text-green-600 mb-3" />
                <span className="text-sm text-gray-600 block font-medium mb-2">BMI Status</span>
                <p className="text-xl font-bold text-green-800">{analysis.basic_info.bmi} - {analysis.basic_info.bmi_category}</p>
              </div>
              <div className="text-center p-6 bg-white rounded-1xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Activity className="h-10 w-10 mx-auto text-orange-600 mb-3" />
                <span className="text-sm text-gray-600 block font-medium mb-2">Activity Level</span>
                <p className="text-xl font-bold text-orange-800 capitalize">{analysis.basic_info.activity_level}</p>
              </div>
              <div className="text-center p-6 bg-white rounded-1xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Target className="h-10 w-10 mx-auto text-purple-600 mb-3" />
                <span className="text-sm text-gray-600 block font-medium mb-2">Goals</span>
                <p className="text-xl font-bold text-purple-800 capitalize">{analysis.basic_info.goals}</p>
              </div>
            </div>
          </div>
        )
      },
      {
        key: 'dosha',
        title: 'Ayurvedic Constitution',
        icon: Activity,
        color: 'orange',
        content: (
          <div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-8 py-4 bg-white rounded-full shadow-lg border border-orange-200">
                <Star className="h-6 w-6 text-orange-600 mr-3" />
                <span className="text-lg text-gray-600 mr-3 font-medium">Dominant Type:</span>
                <span className="text-3xl font-bold text-orange-800 capitalize">
                  {analysis.dosha_constitution.dominant_dosha}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              {['vata', 'pitta', 'kapha'].map((dosha) => (
                <div key={dosha} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <span className="text-lg text-gray-600 block capitalize font-semibold mb-2">{dosha}</span>
                  <p className="text-3xl font-bold text-gray-800 mb-4">{analysis.dosha_constitution.percentages[dosha]}%</p>
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        dosha === 'vata' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                        dosha === 'pitta' ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-gradient-to-r from-green-400 to-green-600'
                      }`}
                      style={{ width: `${analysis.dosha_constitution.percentages[dosha]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {analysis.dosha_constitution.imbalance_severity && (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                  <span className="font-semibold text-gray-700">Imbalance Severity: </span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                    analysis.dosha_constitution.imbalance_severity === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : analysis.dosha_constitution.imbalance_severity === 'medium'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {analysis.dosha_constitution.imbalance_severity}
                  </span>
                </div>
              </div>
            )}
          </div>
        )
      },
      {
        key: 'caloric',
        title: 'Caloric Profile',
        icon: Flame,
        color: 'red',
        content: (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'BMR', value: `${Math.round(analysis.caloric_profile.bmr)} kcal`, desc: 'Basal Metabolic Rate' },
              { label: 'TDEE', value: `${Math.round(analysis.caloric_profile.tdee)} kcal`, desc: 'Total Daily Energy' },
              { label: 'Target Calories', value: `${Math.round(analysis.caloric_profile.target_daily_calories)} kcal`, desc: 'Daily Goal' },
              { label: 'Weekly Calories', value: `${Math.round(analysis.caloric_profile.weekly_calories)} kcal`, desc: 'Weekly Total' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Flame className="h-10 w-10 mx-auto text-red-600 mb-3" />
                <span className="text-sm text-gray-600 block font-medium mb-1">{item.label}</span>
                <p className="text-2xl font-bold text-red-800 mb-2">{item.value}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        )
      },
      {
        key: 'macros',
        title: 'Macronutrient Targets',
        icon: Apple,
        color: 'purple',
        content: (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <Apple className="h-10 w-10 mx-auto text-purple-600 mb-3" />
              <span className="text-sm text-gray-600 block font-medium mb-2">Protein</span>
              <p className="text-2xl font-bold text-purple-800 mb-1">{Math.round(analysis.macronutrient_targets.protein_grams)}g</p>
              <p className="text-sm text-gray-500">({analysis.macronutrient_targets.protein_percentage}%)</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <Flame className="h-10 w-10 mx-auto text-purple-600 mb-3" />
              <span className="text-sm text-gray-600 block font-medium mb-2">Carbohydrates</span>
              <p className="text-2xl font-bold text-purple-800 mb-1">{Math.round(analysis.macronutrient_targets.carbs_grams)}g</p>
              <p className="text-sm text-gray-500">({analysis.macronutrient_targets.carbs_percentage}%)</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <Droplets className="h-10 w-10 mx-auto text-purple-600 mb-3" />
              <span className="text-sm text-gray-600 block font-medium mb-2">Fats</span>
              <p className="text-2xl font-bold text-purple-800 mb-1">{Math.round(analysis.macronutrient_targets.fat_grams)}g</p>
              <p className="text-sm text-gray-500">({analysis.macronutrient_targets.fat_percentage}%)</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <Shield className="h-10 w-10 mx-auto text-purple-600 mb-3" />
              <span className="text-sm text-gray-600 block font-medium mb-2">Fiber</span>
              <p className="text-2xl font-bold text-purple-800">{Math.round(analysis.macronutrient_targets.fiber_grams)}g</p>
            </div>
          </div>
        )
      },
      {
        key: 'micronutrients',
        title: 'Micronutrient Targets',
        icon: Shield,
        color: 'teal',
        content: (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(analysis.micronutrient_targets).map(([nutrient, value]) => (
              <div key={nutrient} className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Shield className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                <span className="text-sm text-gray-600 block capitalize font-medium mb-1">
                  {nutrient.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <p className="text-lg font-bold text-teal-800">{value}</p>
              </div>
            ))}
          </div>
        )
      },
      {
        key: 'hydration',
        title: 'Hydration Requirements',
        icon: Droplets,
        color: 'cyan',
        content: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <Droplets className="h-16 w-16 mx-auto text-cyan-600 mb-4" />
              <span className="text-lg text-gray-600 block font-medium mb-2">Daily Water Goal</span>
              <p className="text-4xl font-bold text-cyan-800">{analysis.hydration_requirements.total_water_liters}L</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <Droplets className="h-16 w-16 mx-auto text-cyan-600 mb-4" />
              <span className="text-lg text-gray-600 block font-medium mb-2">Base Requirement</span>
              <p className="text-4xl font-bold text-cyan-800">{analysis.hydration_requirements.base_water_liters}L</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <Activity className="h-16 w-16 mx-auto text-cyan-600 mb-4" />
              <span className="text-lg text-gray-600 block font-medium mb-2">Activity Adjustment</span>
              <p className="text-4xl font-bold text-cyan-800">{analysis.hydration_requirements.activity_adjustment_liters}L</p>
            </div>
          </div>
        )
      },
      {
        key: 'risks',
        title: 'Health Risk Assessment',
        icon: AlertTriangle,
        color: 'yellow',
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(analysis.health_risk_assessment)
                .filter(([key]) => key !== "risk_factors")
                .map(([risk, value]) => (
                  <div key={risk} className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <AlertTriangle className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                    <span className="text-sm text-gray-600 block capitalize font-medium mb-1">
                      {risk.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <p className={`text-lg font-bold ${
                      value === 'high' ? 'text-red-800' :
                      value === 'medium' ? 'text-yellow-800' : 'text-green-800'
                    }`}>{value}</p>
                  </div>
                ))}
            </div>
            
            {analysis.health_risk_assessment.risk_factors && (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-yellow-600" />
                  Risk Factors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.health_risk_assessment.risk_factors.map((factor, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      },
      {
        key: 'constraints',
        title: 'Dietary Constraints',
        icon: Utensils,
        color: 'green',
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-green-600" />
                  Diet Preferences
                </h4>
                <div className="space-y-3">
                  <div><span className="font-medium text-gray-700">Diet Type:</span> <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">{analysis.dietary_constraints.diet_type}</span></div>
                  <div><span className="font-medium text-gray-700">Cuisine:</span> <span className="text-gray-900 ml-2">{analysis.dietary_constraints.cuisine_preferences.join(", ")}</span></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                  Medical Restrictions
                </h4>
                <div className="space-y-3">
                  <div><span className="font-medium text-gray-700">Allergies:</span> <span className="text-gray-900 ml-2">{analysis.dietary_constraints.allergies.join(", ") || "None"}</span></div>
                  <div><span className="font-medium text-gray-700">Intolerances:</span> <span className="text-gray-900 ml-2">{analysis.dietary_constraints.food_intolerances.join(", ") || "None"}</span></div>
                  <div><span className="font-medium text-gray-700">Conditions:</span> <span className="text-gray-900 ml-2">{analysis.dietary_constraints.medical_conditions.join(", ") || "None"}</span></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-green-600" />
                  Favorite Foods
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.dietary_constraints.favorite_foods.map((food, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{food}</span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                  Disliked Foods
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.dietary_constraints.disliked_foods.map((food, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">{food}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        key: 'lifestyle',
        title: 'Lifestyle Factors',
        icon: Sun,
        color: 'indigo',
        content: (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analysis.lifestyle_factors).map(([factor, value]) => (
              <div key={factor} className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Sun className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                <span className="text-sm text-gray-600 block capitalize font-medium mb-1">
                  {factor.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <p className="text-lg font-bold text-indigo-800">{value || "N/A"}</p>
              </div>
            ))}
          </div>
        )
      }
    ];

    return (
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.key} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <button
              onClick={() => toggleSection(section.key)}
              className={`flex items-center w-full text-left p-6 bg-gradient-to-r from-${section.color}-50 to-${section.color}-100 hover:from-${section.color}-100 hover:to-${section.color}-150 transition-all duration-300`}
            >
              {expandedSections[section.key] ? 
                <ChevronDown className={`text-${section.color}-600 h-6 w-6`} /> : 
                <ChevronRight className={`text-${section.color}-600 h-6 w-6`} />
              }
              <section.icon className={`ml-3 mr-4 h-7 w-7 text-${section.color}-600`} />
              <span className={`font-bold text-${section.color}-800 text-xl`}>{section.title}</span>
            </button>
            
            {expandedSections[section.key] && (
              <div className={`p-8 bg-${section.color}-50/50`}>
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPlanData = () => {
    if (!responseData?.plan) return null;

    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-1xl shadow-xl p-8 border border-white/20">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Utensils className="mr-3 h-8 w-8 text-indigo-600" />
            Your Weekly Diet Plan
          </h3>
          <div className="text-sm text-gray-500 bg-indigo-100 px-4 py-2 rounded-full">
            {Object.keys(responseData.plan).length} days planned
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(responseData.plan).map(([day, dayData], index) => (
            <div key={day} className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg bg-white">
              <button
                onClick={() => toggleDay(day)}
                className="flex items-center justify-between w-full text-left p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-150 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="font-bold text-indigo-800 text-lg">{day}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-indigo-600 bg-white px-4 py-2 rounded-full border border-indigo-200 font-medium">
                    {Object.keys(dayData).filter(key => key !== 'Totals').length} meals
                  </span>
                  {expandedDays[day] ? 
                    <ChevronDown className="text-indigo-600 h-6 w-6" /> : 
                    <ChevronRight className="text-indigo-600 h-6 w-6" />
                  }
                </div>
              </button>

              {expandedDays[day] && (
                <div className="p-6 bg-gray-50">
                  {dayData.Totals && (
                    <div className="mb-8 p-6 bg-white rounded-1xl shadow-lg border border-gray-200">
                      <h5 className="font-bold text-gray-800 mb-6 flex items-center text-lg">
                        <Target className="mr-3 h-6 w-6 text-indigo-600" />
                        Daily Nutrition Summary
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Protein', value: `${dayData.Totals.Protein_g?.toFixed(1)}g`, color: 'blue', icon: Apple },
                          { label: 'Carbs', value: `${dayData.Totals.Carbs_g?.toFixed(1)}g`, color: 'yellow', icon: Flame },
                          { label: 'Fat', value: `${dayData.Totals.Fat_g?.toFixed(1)}g`, color: 'purple', icon: Droplets },
                          { label: 'Fiber', value: `${dayData.Totals.Fibre_g?.toFixed(1)}g`, color: 'orange', icon: Shield },
                        ].map((nutrient) => (
                          <div key={nutrient.label} className={`text-center p-4 bg-${nutrient.color}-50 rounded-xl border border-${nutrient.color}-200 hover:shadow-md transition-shadow`}>
                            <nutrient.icon className={`h-6 w-6 mx-auto text-${nutrient.color}-600 mb-2`} />
                            <span className="text-sm text-gray-600 block font-medium">{nutrient.label}</span>
                            <p className={`text-xl font-bold text-${nutrient.color}-800`}>{nutrient.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {Object.entries(dayData).filter(([key]) => key !== 'Totals').map(([mealType, mealData]) => (
                      <div key={mealType} className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <h5 className="font-bold text-gray-800 mb-6 flex items-center text-lg">
                          <Utensils className="mr-3 h-6 w-6 text-green-600" />
                          {mealType}
                        </h5>
                        
                        {mealData.Items && (
                          <div className="space-y-4">
                            {mealData.Items.map((item, index) => (
                              <div key={index} className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="font-semibold text-gray-800 mb-4 text-lg">{item.Recipe}</div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="flex items-center bg-white px-4 py-3 rounded-xl shadow-sm">
                                    <Apple className="mr-3 h-5 w-5 text-green-600" />
                                    <span className="text-gray-700 font-medium">{item.Protein_g}g protein</span>
                                  </div>
                                  <div className="flex items-center bg-white px-4 py-3 rounded-xl shadow-sm">
                                    <Target className="mr-3 h-5 w-5 text-blue-600" />
                                    <span className="text-gray-700 font-medium">{item.Cuisine} cuisine</span>
                                  </div>
                                  <div className="flex items-center bg-white px-4 py-3 rounded-xl shadow-sm">
                                    <Scale className="mr-3 h-5 w-5 text-purple-600" />
                                    <span className="text-gray-700 font-medium">{item.Amount_g}g serving</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInstructions = () => (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
        <Info className="mr-3 h-8 w-8 text-blue-600" />
        Getting Started
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {[
          {
            step: 1,
            title: 'Enter Token',
            description: 'Input the secure access token provided by your healthcare provider',
            icon: Search
          },
          {
            step: 2,
            title: 'Load Plan',
            description: 'Click the button to securely retrieve your personalized diet plan',
            icon: Download
          },
          {
            step: 3,
            title: 'Review Analysis',
            description: 'Explore your comprehensive health analysis and nutrition targets',
            icon: Activity
          },
          {
            step: 4,
            title: 'Follow Plan',
            description: 'Implement your weekly meal plan and track your progress',
            icon: Target
          }
        ].map(({ step, title, description, icon: Icon }) => (
          <div key={step} className="flex items-start space-x-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
              {step}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                <Icon className="mr-2 h-5 w-5 text-blue-600" />
                {title}
              </h4>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <div className="flex items-start space-x-4">
          <Info className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-blue-800 mb-3 text-lg">Important Information</h4>
            <p className="text-blue-700 leading-relaxed">
              This personalized diet plan has been scientifically designed based on your unique health profile, 
              goals, and Ayurvedic constitution. For optimal results, please follow the recommendations consistently 
              and consult your healthcare provider for any questions or concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 flex items-center shadow-lg">
      <CheckCircle className="h-8 w-8 text-green-500 mr-4 flex-shrink-0" />
      <div>
        <h4 className="font-bold text-green-800 mb-1">Plan Successfully Loaded!</h4>
        <p className="text-green-700">
          Your personalized diet plan has been retrieved. Follow this plan consistently for the best results and improved health outcomes.
        </p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderPatientInfo();
      case 'analysis':
        return renderAnalysisData();
      case 'plan':
        return renderPlanData();
      default:
        return renderPatientInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {renderHeader()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {renderSearchSection()}

        {responseData ? (
          <>
            {renderTabNavigation()}
            {renderTabContent()}
            {renderSuccessMessage()}
          </>
        ) : (
          renderInstructions()
        )}
      </div>

    
    </div>
  );
};

export default PatientPage;