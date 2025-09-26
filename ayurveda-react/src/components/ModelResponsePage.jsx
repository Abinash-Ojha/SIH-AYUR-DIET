import React, { useState, useEffect } from 'react';
  import { useNavigate } from "react-router-dom";
import { 
  Send, 
  FileText, 
  Mail, 
  Loader2, 
  User, 
  Clock, 
  Activity, 
  Target,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
  Heart,
  Scale,
  Droplets,
  Thermometer,
  Shield,
  Brain,
  Utensils,
  Moon,
  Sun,
  Wind,
  Mountain,
  Zap,
  Eye,
  Smile,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  MapPin,
  Coffee,
  Cigarette,
  Wine,
  Dumbbell,
  Bed
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, Area, AreaChart } from 'recharts';

const ModelResponsePage = () => {
  const [patientId, setPatientId] = useState('');
  const [responseId, setResponseId] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('analyze');
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedDays, setExpandedDays] = useState({});
  const [error, setError] = useState('');
   const navigate = useNavigate();


  const API_BASE_URL = 'http://localhost:8080/api/responses';

  
  // Get JWT token from stored user object
const getAuthToken = () => {
  const storedUser =
    localStorage.getItem('user') ||  // <-- your key
    localStorage.getItem('authToken') ||
    localStorage.getItem('token') ||
    localStorage.getItem('jwtToken') ||
    sessionStorage.getItem('authToken') ||
    sessionStorage.getItem('token');

  if (!storedUser) {
    console.log('No token found');
    return null;
  }

  try {
    const userObj = JSON.parse(storedUser);
    const token = userObj.token || null;
    console.log('Retrieved token:', token ? 'Token found' : 'No token in object');
    return token;
  } catch (err) {
    // Already a raw token string
    console.log('Retrieved token (raw):', storedUser);
    return storedUser;
  }
};


  // Clear invalid tokens
  const clearTokens = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('token');
    console.log('Cleared all tokens');
  };

  // Create headers with JWT token
  const getAuthHeaders = () => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const handleAnalyze = async () => {
    if (!patientId.trim()) {
      setError('Please enter a valid Patient ID');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const headers = getAuthHeaders();
      console.log('Making request to:', `${API_BASE_URL}/analyze/${patientId}`);
      
      const response = await fetch(`${API_BASE_URL}/analyze/${patientId}`, {
        method: 'POST',
        headers: headers,
      });
      
      console.log('Response status:', response.status);
      
      if (response.status === 401 || response.status === 403) {
        clearTokens();
        throw new Error('Authentication failed. Token may be invalid or expired. Please login again.');
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();
      setAnalysisData(data);
      setResponseId(data.dietResponseId);
      console.log('Analysis successful, Response ID:', data.dietResponseId);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(`Failed to analyze: ${err.message}`);
      
      if (err.message.includes('Authentication') || err.message.includes('token') || err.message.includes('login')) {
        // Optional: Redirect to login
        // window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

 const handleGetPlan = async () => {
  if (!responseId || String(responseId).trim() === "") {
    setError("Please enter a valid Response ID or run analysis first");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const headers = getAuthHeaders(); // no need for Content-Type if no body
    console.log("Sending POST request to:", `${API_BASE_URL}/plan/${responseId}`);

    const response = await fetch(`${API_BASE_URL}/plan/${responseId}`, {
      method: "POST",
      headers,
    });

    console.log("Response status:", response.status);

    if (response.status === 401 || response.status === 403) {
      clearTokens();
      throw new Error("Authentication failed. Please login again.");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    setPlanData(data);
  } catch (err) {
    setError(`Failed to get plan: ${err.message}`);
  } finally {
    setLoading(false);
  }
};



  const handleGetFullData = async () => {
  if (!responseId || String(responseId).trim() === "") {
    setError("Please enter a valid Response ID");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const headers = getAuthHeaders();
    const response = await fetch(
      `${API_BASE_URL}/getAnalysisAndPlan/${String(responseId)}`,
      { headers }
    );

    if (response.status === 401 || response.status === 403) {
      clearTokens();
      throw new Error("Authentication failed. Please login again.");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    setFullData(data);
  } catch (err) {
    setError(`Failed to get full data: ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  const handleSendMail = async () => {
    if (!patientId.trim()) {
      setError('Please enter a valid Patient ID');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const headers = getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/send-response/${patientId}`, {
        method: 'POST',
        headers: headers,
      });
      
      if (response.status === 401 || response.status === 403) {
        clearTokens();
        throw new Error('Authentication failed. Please login again.');
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }
      
      alert('Mail sent successfully to patient!');
    } catch (err) {
      setError(`Failed to send mail: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

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

  // Helper function to get BMI category color and icon
  const getBMIStatus = (bmi, category) => {
    if (category === 'underweight') return { color: 'text-blue-600', bg: 'bg-blue-100', icon: TrendingDown };
    if (category === 'normal') return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
    if (category === 'overweight') return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: TrendingUp };
    return { color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle };
  };

  // Helper function to get risk level status
  const getRiskStatus = (risk) => {
    if (risk === 'low') return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
    if (risk === 'medium' || risk === 'moderate') return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertTriangle };
    return { color: 'text-red-600', bg: 'bg-red-100', icon: XCircle };
  };

  // Helper function to get activity level icon
  const getActivityIcon = (level) => {
    switch(level?.toLowerCase()) {
      case 'low': case 'sedentary': return Bed;
      case 'moderate': case 'medium': return Activity;
      case 'high': case 'active': return Dumbbell;
      default: return Activity;
    }
  };

  const renderAnalysisData = () => {
    if (!analysisData) return null;

    const { analysis, fromCache, dietResponseId } = analysisData;
    const DOSHA_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

    // Prepare data for charts
    const doshaData = [
      { name: 'Vata', value: analysis.dosha_constitution.percentages.vata, color: DOSHA_COLORS[0] },
      { name: 'Pitta', value: analysis.dosha_constitution.percentages.pitta, color: DOSHA_COLORS[1] },
      { name: 'Kapha', value: analysis.dosha_constitution.percentages.kapha, color: DOSHA_COLORS[2] }
    ];

    const macroData = [
      { name: 'Protein', value: analysis.macronutrient_targets.protein_percentage, color: '#8884d8' },
      { name: 'Carbs', value: analysis.macronutrient_targets.carbs_percentage, color: '#82ca9d' },
      { name: 'Fat', value: analysis.macronutrient_targets.fat_percentage, color: '#ffc658' }
    ];

    const riskData = [
      { subject: 'Metabolic', value: analysis.health_risk_assessment.metabolic_risk === 'low' ? 1 : analysis.health_risk_assessment.metabolic_risk === 'medium' ? 2 : 3 },
      { subject: 'Cardiovascular', value: analysis.health_risk_assessment.cardiovascular_risk === 'low' ? 1 : analysis.health_risk_assessment.cardiovascular_risk === 'medium' ? 2 : 3 },
      { subject: 'Digestive', value: analysis.health_risk_assessment.digestive_risk === 'low' ? 1 : analysis.health_risk_assessment.digestive_risk === 'medium' ? 2 : 3 },
      { subject: 'Hormonal', value: analysis.health_risk_assessment.hormonal_risk === 'low' ? 1 : analysis.health_risk_assessment.hormonal_risk === 'medium' ? 2 : 3 },
      { subject: 'Inflammatory', value: analysis.health_risk_assessment.inflammatory_risk === 'low' ? 1 : analysis.health_risk_assessment.inflammatory_risk === 'medium' ? 2 : 3 }
    ];

    const micronutrientData = Object.entries(analysis.micronutrient_targets).map(([key, value]) => ({
      name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: typeof value === 'number' ? value : 0
    }));

    return (
      <div className="space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <FileText className="mr-3 h-8 w-8" />
              Comprehensive Analysis Results
            </h3>
            <div className="flex items-center space-x-3">
              {fromCache && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  From Cache
                </span>
              )}
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                ID: {dietResponseId}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center"><Clock className="mr-1 h-4 w-4" /> {new Date(analysis.timestamp).toLocaleString()}</span>
              <span className="flex items-center"><User className="mr-1 h-4 w-4" /> Patient ID: {analysis.patient_id}</span>
              <span className="flex items-center"><FileText className="mr-1 h-4 w-4" /> Version: {analysis.analysis_metadata.analysis_version}</span>
            </div>
          </div>
        </div>

        {/* Basic Information Dashboard */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('basicInfo')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
          >
            {expandedSections.basicInfo ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <User className="mr-2 h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-blue-800">Basic Information & Vitals</span>
          </button>
          
          {expandedSections.basicInfo && (
            <div className="mt-6 space-y-6">
              {/* Demographics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-600">Age</span>
                  <p className="text-2xl font-bold text-blue-800">{analysis.basic_info.age}</p>
                  <span className="text-xs text-gray-500">years</span>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <User className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm text-gray-600">Gender</span>
                  <p className="text-2xl font-bold text-purple-800">{analysis.basic_info.gender}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Scale className="mx-auto h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm text-gray-600">Weight</span>
                  <p className="text-2xl font-bold text-green-800">{analysis.basic_info.weight}</p>
                  <span className="text-xs text-gray-500">kg</span>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <TrendingUp className="mx-auto h-8 w-8 text-indigo-600 mb-2" />
                  <span className="text-sm text-gray-600">Height</span>
                  <p className="text-2xl font-bold text-indigo-800">{analysis.basic_info.height}</p>
                  <span className="text-xs text-gray-500">cm</span>
                </div>
              </div>

              {/* BMI and Activity Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-4 ${getBMIStatus(analysis.basic_info.bmi, analysis.basic_info.bmi_category).bg} rounded-lg`}>
                  {React.createElement(getBMIStatus(analysis.basic_info.bmi, analysis.basic_info.bmi_category).icon, {
                    className: `h-8 w-8 ${getBMIStatus(analysis.basic_info.bmi, analysis.basic_info.bmi_category).color} mb-2`
                  })}
                  <span className="text-sm text-gray-600">BMI Status</span>
                  <p className="text-xl font-bold">{analysis.basic_info.bmi} - {analysis.basic_info.bmi_category}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  {React.createElement(getActivityIcon(analysis.basic_info.activity_level), {
                    className: "h-8 w-8 text-orange-600 mb-2"
                  })}
                  <span className="text-sm text-gray-600">Activity Level</span>
                  <p className="text-xl font-bold text-orange-800">{analysis.basic_info.activity_level}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <Target className="h-8 w-8 text-red-600 mb-2" />
                  <span className="text-sm text-gray-600">Goals</span>
                  <p className="text-xl font-bold text-red-800">{analysis.basic_info.goals}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dosha Constitution with Visualization */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('dosha')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg hover:from-orange-100 hover:to-red-100 transition-all duration-200"
          >
            {expandedSections.dosha ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <Sun className="mr-2 h-6 w-6 text-orange-600" />
            <span className="text-xl font-semibold text-orange-800">Dosha Constitution Analysis</span>
          </button>
          
          {expandedSections.dosha && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dosha Chart */}
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-4">Dosha Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={doshaData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {doshaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Dosha Details */}
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
                  <Mountain className="mx-auto h-10 w-10 text-orange-600 mb-2" />
                  <span className="text-sm text-gray-600">Dominant Dosha</span>
                  <p className="text-2xl font-bold text-orange-800 capitalize">{analysis.dosha_constitution.dominant_dosha}</p>
                  <span className="text-sm px-2 py-1 bg-orange-200 text-orange-800 rounded-full">
                    {analysis.dosha_constitution.imbalance_severity} imbalance
                  </span>
                </div>

                <div className="space-y-3">
                  {doshaData.map((dosha, index) => (
                    <div key={dosha.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: dosha.color }}></div>
                        <span className="font-semibold">{dosha.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${dosha.value}%`, 
                              backgroundColor: dosha.color 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold">{dosha.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        

        Caloric Profile
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('caloric')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg hover:from-green-100 hover:to-teal-100 transition-all duration-200"
          >
            {expandedSections.caloric ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <Zap className="mr-2 h-6 w-6 text-green-600" />
            <span className="text-xl font-semibold text-green-800">Metabolic & Caloric Profile</span>
          </button>
          
          {expandedSections.caloric && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Heart className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">BMR</span>
                <p className="text-xl font-bold text-blue-800">{analysis.caloric_profile.bmr.toFixed(0)}</p>
                <span className="text-xs text-gray-500">kcal/day</span>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Activity className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm text-gray-600">TDEE</span>
                <p className="text-xl font-bold text-green-800">{analysis.caloric_profile.tdee.toFixed(0)}</p>
                <span className="text-xs text-gray-500">kcal/day</span>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm text-gray-600">Target Daily</span>
                <p className="text-xl font-bold text-purple-800">{analysis.caloric_profile.target_daily_calories.toFixed(0)}</p>
                <span className="text-xs text-gray-500">kcal/day</span>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Calendar className="mx-auto h-8 w-8 text-orange-600 mb-2" />
                <span className="text-sm text-gray-600">Weekly Target</span>
                <p className="text-xl font-bold text-orange-800">{analysis.caloric_profile.weekly_calories.toFixed(0)}</p>
                <span className="text-xs text-gray-500">kcal/week</span>
              </div>
            </div>
          )}
        </div>*/

        {/* Macronutrient Targets */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('macros')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
          >
            {expandedSections.macros ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <PieChartIcon className="mr-2 h-6 w-6 text-purple-600" />
            <span className="text-xl font-semibold text-purple-800">Macronutrient Distribution</span>
          </button>
          
          {expandedSections.macros && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Macro Chart */}
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-4">Macronutrient Ratio</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Macro Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-blue-800">Protein</span>
                      <span className="text-blue-600">{analysis.macronutrient_targets.protein_percentage}%</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-800">{analysis.macronutrient_targets.protein_grams.toFixed(1)}g</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-800">Carbohydrates</span>
                      <span className="text-green-600">{analysis.macronutrient_targets.carbs_percentage}%</span>
                    </div>
                    <p className="text-2xl font-bold text-green-800">{analysis.macronutrient_targets.carbs_grams.toFixed(1)}g</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-yellow-800">Fat</span>
                      <span className="text-yellow-600">{analysis.macronutrient_targets.fat_percentage}%</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-800">{analysis.macronutrient_targets.fat_grams.toFixed(1)}g</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-orange-800">Fiber</span>
                      <span className="text-orange-600">Daily Target</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-800">{analysis.macronutrient_targets.fiber_grams}g</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Micronutrient Targets */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('micros')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg hover:from-teal-100 hover:to-cyan-100 transition-all duration-200"
          >
            {expandedSections.micros ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <BarChart3 className="mr-2 h-6 w-6 text-teal-600" />
            <span className="text-xl font-semibold text-teal-800">Micronutrient Requirements</span>
          </button>
          
          {expandedSections.micros && (
            <div className="mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={micronutrientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    interval={0}
                    fontSize={10}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#14B8A6" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(analysis.micronutrient_targets).slice(0, 8).map(([key, value]) => (
                  <div key={key} className="p-3 bg-teal-50 rounded-lg text-center">
                    <span className="text-xs text-gray-600 block">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    <p className="text-sm font-bold text-teal-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hydration Requirements */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('hydration')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-200"
          >
            {expandedSections.hydration ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <Droplets className="mr-2 h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-blue-800">Hydration Requirements</span>
          </button>
          
          {expandedSections.hydration && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Droplets className="mx-auto h-10 w-10 text-blue-600 mb-3" />
                <span className="text-sm text-gray-600">Total Water Needed</span>
                <p className="text-2xl font-bold text-blue-800">{analysis.hydration_requirements.total_water_liters.toFixed(1)}L</p>
                <span className="text-xs text-gray-500">per day</span>
              </div>
              <div className="text-center p-4 bg-cyan-50 rounded-lg">
                <Droplets className="mx-auto h-10 w-10 text-cyan-600 mb-3" />
                <span className="text-sm text-gray-600">Base Water</span>
                <p className="text-2xl font-bold text-cyan-800">{analysis.hydration_requirements.base_water_liters.toFixed(1)}L</p>
                <span className="text-xs text-gray-500">baseline</span>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <Activity className="mx-auto h-10 w-10 text-teal-600 mb-3" />
                <span className="text-sm text-gray-600">Activity Adjustment</span>
                <p className="text-2xl font-bold text-teal-800">{analysis.hydration_requirements.activity_adjustment_liters.toFixed(1)}L</p>
                <span className="text-xs text-gray-500">extra for activity</span>
              </div>
            </div>
          )}
        </div>

        {/* Health Risk Assessment */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('risks')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg hover:from-red-100 hover:to-pink-100 transition-all duration-200"
          >
            {expandedSections.risks ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <Shield className="mr-2 h-6 w-6 text-red-600" />
            <span className="text-xl font-semibold text-red-800">Health Risk Assessment</span>
          </button>
          
          {expandedSections.risks && (
            <div className="mt-6">
              {/* Risk Radar Chart */}
              <div className="flex justify-center mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={riskData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 3]} tickCount={4} />
                    <Radar
                      name="Risk Level"
                      dataKey="value"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Risk Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(analysis.health_risk_assessment).filter(([key]) => key.includes('_risk')).map(([key, value]) => {
                  const riskStatus = getRiskStatus(value);
                  const riskName = key.replace('_risk', '').replace(/\b\w/g, l => l.toUpperCase());
                  return (
                    <div key={key} className={`p-4 ${riskStatus.bg} rounded-lg`}>
                      <div className="flex items-center justify-between">
                        {React.createElement(riskStatus.icon, {
                          className: `h-6 w-6 ${riskStatus.color}`
                        })}
                        <span className="text-sm font-semibold">{riskName}</span>
                      </div>
                      <p className={`text-lg font-bold ${riskStatus.color} capitalize mt-1`}>{value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Risk Factors */}
              {analysis.health_risk_assessment.risk_factors?.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Risk Factors Identified:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {analysis.health_risk_assessment.risk_factors.map((factor, index) => (
                      <li key={index} className="text-yellow-700">{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dietary Constraints */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('dietary')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg hover:from-green-100 hover:to-lime-100 transition-all duration-200"
          >
            {expandedSections.dietary ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <Utensils className="mr-2 h-6 w-6 text-green-600" />
            <span className="text-xl font-semibold text-green-800">Dietary Profile & Preferences</span>
          </button>
          
          {expandedSections.dietary && (
            <div className="mt-6 space-y-6">
              {/* Diet Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <Utensils className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm text-gray-600">Diet Type</span>
                  <p className="text-xl font-bold text-green-800">{analysis.dietary_constraints.diet_type}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-600">Cuisine Preferences</span>
                  <p className="text-xl font-bold text-blue-800">{analysis.dietary_constraints.cuisine_preferences.join(', ')}</p>
                </div>
              </div>

              {/* Allergies and Intolerances */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600 mb-2" />
                  <span className="text-sm text-gray-600">Allergies</span>
                  <div className="mt-2">
                    {analysis.dietary_constraints.allergies.length > 0 ? (
                      analysis.dietary_constraints.allergies.map((allergy, index) => (
                        <span key={index} className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs mr-1 mb-1">
                          {allergy.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">None reported</span>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mb-2" />
                  <span className="text-sm text-gray-600">Food Intolerances</span>
                  <div className="mt-2">
                    {analysis.dietary_constraints.food_intolerances.length > 0 ? (
                      analysis.dietary_constraints.food_intolerances.map((intolerance, index) => (
                        <span key={index} className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs mr-1 mb-1">
                          {intolerance}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">None reported</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Food Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <Smile className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-sm text-gray-600">Favorite Foods</span>
                  <div className="mt-2">
                    {analysis.dietary_constraints.favorite_foods.map((food, index) => (
                      <span key={index} className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-1 mb-1">
                        {food.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <XCircle className="h-6 w-6 text-gray-600 mb-2" />
                  <span className="text-sm text-gray-600">Disliked Foods</span>
                  <div className="mt-2">
                    {analysis.dietary_constraints.disliked_foods.map((food, index) => (
                      <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs mr-1 mb-1">
                        {food.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lifestyle Factors */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={() => toggleSection('lifestyle')}
            className="flex items-center w-full text-left p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-200"
          >
            {expandedSections.lifestyle ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
            <Brain className="mr-2 h-6 w-6 text-indigo-600" />
            <span className="text-xl font-semibold text-indigo-800">Lifestyle & Wellness Factors</span>
          </button>
          
          {expandedSections.lifestyle && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Brain className="mx-auto h-8 w-8 text-red-600 mb-2" />
                <span className="text-sm text-gray-600">Stress Level</span>
                <p className="text-lg font-bold text-red-800">{analysis.lifestyle_factors.stress_level}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Moon className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm text-gray-600">Sleep Quality</span>
                <p className="text-lg font-bold text-blue-800">{analysis.lifestyle_factors.sleep_quality}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Activity className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm text-gray-600">Digestion</span>
                <p className="text-lg font-bold text-green-800">{analysis.lifestyle_factors.digestion_status}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Utensils className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
                <span className="text-sm text-gray-600">Appetite</span>
                <p className="text-lg font-bold text-yellow-800">{analysis.lifestyle_factors.appetite_pattern}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Sun className="mx-auto h-8 w-8 text-orange-600 mb-2" />
                <span className="text-sm text-gray-600">Season</span>
                <p className="text-lg font-bold text-orange-800">{analysis.lifestyle_factors.season}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Thermometer className="mx-auto h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm text-gray-600">Climate</span>
                <p className="text-lg font-bold text-purple-800">{analysis.lifestyle_factors.climate || 'Not specified'}</p>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <Dumbbell className="mx-auto h-8 w-8 text-indigo-600 mb-2" />
                <span className="text-sm text-gray-600">Workout Type</span>
                <p className="text-lg font-bold text-indigo-800">{analysis.lifestyle_factors.workout_type || 'Not specified'}</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <Calendar className="mx-auto h-8 w-8 text-teal-600 mb-2" />
                <span className="text-sm text-gray-600">Frequency</span>
                <p className="text-lg font-bold text-teal-800">{analysis.lifestyle_factors.workout_frequency || 'Not specified'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPlanData = () => {
    if (!planData || !planData.plan) return null;

    // Calculate weekly totals
    const weeklyTotals = Object.values(planData.plan).reduce((acc, day) => {
      if (day.Totals) {
        acc.calories += day.Totals.Calories || 0;
        acc.protein += day.Totals.Protein_g || 0;
        acc.carbs += day.Totals.Carbs_g || 0;
        acc.fat += day.Totals.Fat_g || 0;
        acc.fiber += day.Totals.Fibre_g || 0;
      }
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

    // Prepare data for charts
    const dailyCaloriesData = Object.entries(planData.plan).map(([day, dayData]) => ({
      day: day.substring(0, 3),
      calories: dayData.Totals?.Calories || 0,
      protein: dayData.Totals?.Protein_g || 0,
      carbs: dayData.Totals?.Carbs_g || 0,
      fat: dayData.Totals?.Fat_g || 0
    }));

    const avgDaily = {
      calories: weeklyTotals.calories / 7,
      protein: weeklyTotals.protein / 7,
      carbs: weeklyTotals.carbs / 7,
      fat: weeklyTotals.fat / 7,
      fiber: weeklyTotals.fiber / 7
    };

    return (
      <div className="space-y-6">
        {/* Plan Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <Target className="mr-3 h-8 w-8" />
              Personalized Diet Plan
            </h3>
            <div className="flex items-center space-x-3">
              {planData.fromCache && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  From Cache
                </span>
              )}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                7-Day Plan
              </span>
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Zap className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm text-gray-600">Avg Daily Calories</span>
              <p className="text-2xl font-bold text-blue-800">{avgDaily.calories.toFixed(0)}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Activity className="mx-auto h-8 w-8 text-red-600 mb-2" />
              <span className="text-sm text-gray-600">Avg Protein</span>
              <p className="text-2xl font-bold text-red-800">{avgDaily.protein.toFixed(1)}g</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Utensils className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm text-gray-600">Avg Carbs</span>
              <p className="text-2xl font-bold text-green-800">{avgDaily.carbs.toFixed(1)}g</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Droplets className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
              <span className="text-sm text-gray-600">Avg Fat</span>
              <p className="text-2xl font-bold text-yellow-800">{avgDaily.fat.toFixed(1)}g</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Heart className="mx-auto h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm text-gray-600">Avg Fiber</span>
              <p className="text-2xl font-bold text-purple-800">{avgDaily.fiber.toFixed(1)}g</p>
            </div>
          </div>

          {/* Weekly Nutrition Chart */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 text-center">Weekly Nutrition Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyCaloriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#3B82F6" name="Calories" />
                <Bar dataKey="protein" fill="#EF4444" name="Protein (g)" />
                <Bar dataKey="carbs" fill="#10B981" name="Carbs (g)" />
                <Bar dataKey="fat" fill="#F59E0B" name="Fat (g)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Plans */}
        {Object.entries(planData.plan).map(([day, dayData]) => (
          <div key={day} className="bg-white rounded-lg shadow-lg p-6">
            <button
              onClick={() => toggleDay(day)}
              className="flex items-center justify-between w-full text-left p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-200"
            >
              <div className="flex items-center">
                <Calendar className="mr-3 h-6 w-6 text-indigo-600" />
                <span className="text-xl font-semibold text-indigo-800">{day}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">View</p>
                  <p className="text-lg font-bold text-indigo-800"></p>
                </div>
                {expandedDays[day] ? <ChevronDown className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
              </div>
            </button>

            {expandedDays[day] && (
              <div className="mt-6 space-y-6">
                {/* Daily Totals Dashboard */}
                {dayData.Totals && (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Daily Nutritional Summary
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <Zap className="mx-auto h-6 w-6 text-blue-600 mb-1" />
                        <span className="text-xs text-gray-600">Calories</span>
                        <p className="text-lg font-bold text-blue-800">{dayData.Totals.Calories?.toFixed(0)}</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <Activity className="mx-auto h-6 w-6 text-red-600 mb-1" />
                        <span className="text-xs text-gray-600">Protein</span>
                        <p className="text-lg font-bold text-red-800">{dayData.Totals.Protein_g?.toFixed(1)}g</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <Utensils className="mx-auto h-6 w-6 text-green-600 mb-1" />
                        <span className="text-xs text-gray-600">Carbs</span>
                        <p className="text-lg font-bold text-green-800">{dayData.Totals.Carbs_g?.toFixed(1)}g</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <Droplets className="mx-auto h-6 w-6 text-yellow-600 mb-1" />
                        <span className="text-xs text-gray-600">Fat</span>
                        <p className="text-lg font-bold text-yellow-800">{dayData.Totals.Fat_g?.toFixed(1)}g</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <Heart className="mx-auto h-6 w-6 text-purple-600 mb-1" />
                        <span className="text-xs text-gray-600">Fiber</span>
                        <p className="text-lg font-bold text-purple-800">{dayData.Totals.Fibre_g?.toFixed(1)}g</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Meal Plans */}
                <div className="space-y-4">
                  {Object.entries(dayData).filter(([key]) => key !== 'Totals').map(([mealType, mealData]) => {
                    const getMealIcon = (meal) => {
                      switch(meal.toLowerCase()) {
                        case 'breakfast': return Sun;
                        case 'lunch': return Utensils;
                        case 'dinner': return Moon;
                        case 'snack': case 'snacks': return Coffee;
                        default: return Utensils;
                      }
                    };

                    const getMealColor = (meal) => {
                      switch(meal.toLowerCase()) {
                        case 'breakfast': return { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' };
                        case 'lunch': return { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' };
                        case 'dinner': return { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' };
                        case 'snack': case 'snacks': return { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' };
                        default: return { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' };
                      }
                    };

                    const mealColors = getMealColor(mealType);
                    const MealIcon = getMealIcon(mealType);

                    return (
                      <div key={mealType} className={`p-4 ${mealColors.bg} border ${mealColors.border} rounded-lg`}>
                        <div className="flex items-center mb-3">
                          <MealIcon className={`h-6 w-6 ${mealColors.text} mr-2`} />
                          <h5 className={`text-lg font-semibold ${mealColors.text}`}>{mealType}</h5>
                        </div>
                        
                        {mealData.Items && mealData.Items.map((item, index) => (
                          <div key={index} className="mb-3 p-3 bg-white rounded-lg shadow-sm">
                            <div className="font-medium text-gray-800 mb-2">{item.Recipe}</div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Zap className="h-4 w-4 mr-1 text-orange-500" />
                                <span>{item.Calories} cal</span>
                              </div>
                              <div className="flex items-center">
                                <Activity className="h-4 w-4 mr-1 text-red-500" />
                                <span>{item.Protein_g}g protein</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                                <span>{item.Cuisine}</span>
                              </div>
                              <div className="flex items-center">
                                <Scale className="h-4 w-4 mr-1 text-green-500" />
                                <span>{item.Amount_g}g serving</span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {mealData.MealTotals && (
                          <div className="mt-3 p-3 bg-white bg-opacity-70 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Meal Total:</span>
                              <div className="text-sm text-gray-600">
                                <span className="mr-3">{mealData.MealTotals.Calories?.toFixed(0)} cal</span>
                                <span>{mealData.MealTotals.Protein_g?.toFixed(1)}g protein</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderFullData = () => {
    if (!fullData) return null;

    return (
      <div className="space-y-6">
        {/* Full Data Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
            <User className="mr-3 h-8 w-8" />
            Complete Analysis & Plan Overview
          </h3>

          {/* Patient & Doctor Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Patient Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm text-blue-600 w-16">Name:</span>
                  <p className="font-medium text-blue-900">{fullData.patient?.fullName}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-blue-600 w-16">Email:</span>
                  <p className="font-medium text-blue-900">{fullData.patient?.email}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-blue-600 w-16">ID:</span>
                  <p className="font-medium text-blue-900">{fullData.patient?.id}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Doctor Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm text-green-600 w-20">Name:</span>
                  <p className="font-medium text-green-900">{fullData.doctor?.name}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 w-20">Email:</span>
                  <p className="font-medium text-green-900">{fullData.doctor?.email}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 w-20">Specialty:</span>
                  <p className="font-medium text-green-900">{fullData.doctor?.specialization}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Clock className="mx-auto h-8 w-8 text-gray-600 mb-2" />
                <span className="text-sm text-gray-600">Created</span>
                <p className="font-semibold text-gray-800">{new Date(fullData.createdAt).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">{new Date(fullData.createdAt).toLocaleTimeString()}</p>
              </div>
              <div className="text-center">
                <FileText className="mx-auto h-8 w-8 text-gray-600 mb-2" />
                <span className="text-sm text-gray-600">Response ID</span>
                <p className="font-semibold text-gray-800">{fullData.dietResponseId}</p>
              </div>
              <div className="text-center">
                <Target className="mx-auto h-8 w-8 text-gray-600 mb-2" />
                <span className="text-sm text-gray-600">Status</span>
                <p className="font-semibold text-green-800">Completed</p>
              </div>
            </div>

            {fullData.doctorsRemark && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <div>
                    <span className="font-medium text-yellow-800">Doctor's Remark:</span>
                    <p className="text-yellow-700 mt-1">{fullData.doctorsRemark}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Navigation Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200" onClick={() => navigate("/doctor/dashboard")}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900  " >Ayurvedic Diet Plan Generation Dashboard</h1>
              <p className="text-sm text-gray-600">Advanced Dosha Analytics and Diet plan </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span className="text-sm text-gray-600">Doctor Portal</span>
                <p className="text-xs text-gray-500">v2.0.1</p>
              </div>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Control Panel */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">AI Model API Controls</h2>
              <p className="text-gray-600 mt-1">Manage patient analysis and diet planning workflows</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">API Online</span>
            </div>
          </div>
          
          {/* Enhanced Token Debug Info */}
          <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Authentication Status: 
                </span>
                <span className={`text-sm font-semibold ${getAuthToken() ? 'text-green-600' : 'text-red-600'}`}>
                  {getAuthToken() ? '✓ Authenticated' : '✗ No Token'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const token = getAuthToken();
                    if (token) {
                      console.log('Current token:', token);
                      alert('Check console for token details');
                    } else {
                      alert('No token found in storage');
                    }
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 bg-blue-50 rounded"
                >
                  Debug Token
                </button>
                {getAuthToken() && (
                  <button
                    onClick={clearTokens}
                    className="text-xs text-red-600 hover:text-red-800 px-2 py-1 bg-red-50 rounded"
                  >
                    Clear Tokens
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Enhanced Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Patient ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="Enter Patient ID (e.g., PAT_31)"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Response ID
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={responseId}
                  onChange={(e) => setResponseId(e.target.value)}
                  placeholder="Response ID (auto-filled from analysis)"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-red-800">Error:</span>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
              Analyze Patient
            </button>

            <button
              onClick={handleGetPlan}
              disabled={loading}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <FileText className="h-5 w-5 mr-2" />}
              Get Diet Plan
            </button>

            <button
              onClick={handleGetFullData}
              disabled={loading}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Activity className="h-5 w-5 mr-2" />}
              Get Full Data
            </button>

            <button
              onClick={handleSendMail}
              disabled={loading}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Mail className="h-5 w-5 mr-2" />}
              Send Mail
            </button>
          </div>
        </div>

        {/* Results Display */}
        <div className="space-y-8">
          {analysisData && renderAnalysisData()}
          {planData && renderPlanData()}
          {fullData && renderFullData()}
        </div>
      </div>
    </div>
  );
};

export default ModelResponsePage;