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
  AlertCircle,
  CheckCircle,
  Calendar,
  UserCheck,
  Loader2,
  Search,
  Info,
  Utensils
} from 'lucide-react';

const PatientPage = () => {
  const [token, setToken] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedDays, setExpandedDays] = useState({});

  const API_BASE_URL = 'http://localhost:8080/api/responses';

  const fetchPlanByToken = async () => {
    if (!token.trim()) {
      setError('Please enter a valid access token');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/getPlan/token/${token}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error (${response.status})`);
      }
      
      const data = await response.json();
      setResponseData(data);
      
      // Auto-expand basic sections for better UX
      setExpandedSections({
        basicInfo: true,
        dosha: true
      });
      
    } catch (err) {
      setError(err.message);
      setResponseData(null);
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

  const renderPatientInfo = () => {
    if (!responseData?.patient && !responseData?.doctor) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
          <UserCheck className="mr-3 h-7 w-7 text-blue-600" />
          Your Diet Plan Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Information */}
          {responseData.patient && (
            <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Patient Information
              </h3>
              <div className="space-y-3">
                <p className="flex items-center"><span className="font-medium text-gray-700 w-20">Name:</span> <span className="text-gray-900">{responseData.patient.fullName}</span></p>
                <p className="flex items-center"><span className="font-medium text-gray-700 w-20">Email:</span> <span className="text-gray-900">{responseData.patient.email}</span></p>
                <p className="flex items-center"><span className="font-medium text-gray-700 w-20">Patient ID:</span> <span className="text-gray-900">{responseData.patient.id}</span></p>
              </div>
            </div>
          )}
          
          {/* Doctor Information */}
          {responseData.doctor && (
            <div className="p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                <UserCheck className="mr-2 h-5 w-5" />
                Your Doctor
              </h3>
              <div className="space-y-3">
                <p className="flex items-center"><span className="font-medium text-gray-700 w-24">Doctor:</span> <span className="text-gray-900">Dr. {responseData.doctor.name}</span></p>
                <p className="flex items-center"><span className="font-medium text-gray-700 w-24">Email:</span> <span className="text-gray-900">{responseData.doctor.email}</span></p>
                <p className="flex items-center"><span className="font-medium text-gray-700 w-24">Specialization:</span> <span className="text-gray-900">{responseData.doctor.specialization}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Plan Details */}
        <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm">
                <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm text-gray-700 font-medium">
                  Plan Created: {new Date(responseData.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
            
            {responseData.doctorsRemark && (
              <div className="flex-1 min-w-0 bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Doctor's Note:</p>
                    <p className="text-sm text-gray-600 mt-1">{responseData.doctorsRemark}</p>
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

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 flex items-center mb-6">
          <Activity className="mr-2 h-6 w-6 text-indigo-600" />
          Your Health Analysis
        </h3>

        {/* Basic Info */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('basicInfo')}
            className="flex items-center w-full text-left p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-150 transition-all duration-200 border border-blue-200"
          >
            {expandedSections.basicInfo ? <ChevronDown className="text-blue-600" /> : <ChevronRight className="text-blue-600" />}
            <User className="ml-2 mr-3 h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Basic Health Profile</span>
          </button>
          
          {expandedSections.basicInfo && (
            <div className="mt-4 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Scale className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <span className="text-sm text-gray-600 block font-medium">Age</span>
                  <p className="text-xl font-bold text-gray-800">{analysis.basic_info.age} years</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <User className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <span className="text-sm text-gray-600 block font-medium">Gender</span>
                  <p className="text-xl font-bold text-gray-800 capitalize">{analysis.basic_info.gender}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Scale className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <span className="text-sm text-gray-600 block font-medium">Weight</span>
                  <p className="text-xl font-bold text-gray-800">{analysis.basic_info.weight} kg</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Scale className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <span className="text-sm text-gray-600 block font-medium">Height</span>
                  <p className="text-xl font-bold text-gray-800">{analysis.basic_info.height} cm</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Heart className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <span className="text-sm text-gray-600 block font-medium">BMI Status</span>
                  <p className="text-lg font-bold text-green-800">{analysis.basic_info.bmi} - {analysis.basic_info.bmi_category}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Activity className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <span className="text-sm text-gray-600 block font-medium">Activity Level</span>
                  <p className="text-lg font-bold text-orange-800 capitalize">{analysis.basic_info.activity_level}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <span className="text-sm text-gray-600 block font-medium">Goals</span>
                  <p className="text-lg font-bold text-purple-800 capitalize">{analysis.basic_info.goals}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dosha Constitution */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('dosha')}
            className="flex items-center w-full text-left p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-150 transition-all duration-200 border border-orange-200"
          >
            {expandedSections.dosha ? <ChevronDown className="text-orange-600" /> : <ChevronRight className="text-orange-600" />}
            <Activity className="ml-2 mr-3 h-5 w-5 text-orange-600" />
            <span className="font-semibold text-orange-800">Your Ayurvedic Constitution (Dosha)</span>
          </button>
          
          {expandedSections.dosha && (
            <div className="mt-4 p-6 bg-orange-50 rounded-xl border border-orange-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-8 py-4 bg-white rounded-full shadow-sm border border-orange-200">
                  <span className="text-sm text-gray-600 mr-3 font-medium">Dominant Type:</span>
                  <span className="text-2xl font-bold text-orange-800 capitalize">
                    {analysis.dosha_constitution.dominant_dosha}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {['vata', 'pitta', 'kapha'].map((dosha) => (
                  <div key={dosha} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <span className="text-sm text-gray-600 block capitalize font-medium">{dosha}</span>
                    <p className="text-2xl font-bold text-gray-800">{analysis.dosha_constitution.percentages[dosha]}%</p>
                    <div className="mt-3 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          dosha === 'vata' ? 'bg-blue-500' : 
                          dosha === 'pitta' ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${analysis.dosha_constitution.percentages[dosha]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Macronutrient Targets */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('macros')}
            className="flex items-center w-full text-left p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-150 transition-all duration-200 border border-purple-200"
          >
            {expandedSections.macros ? <ChevronDown className="text-purple-600" /> : <ChevronRight className="text-purple-600" />}
            <Apple className="ml-2 mr-3 h-5 w-5 text-purple-600" />
            <span className="font-semibold text-purple-800">Daily Nutrition Targets</span>
          </button>
          
          {expandedSections.macros && analysis.macronutrient_targets && (
            <div className="mt-4 p-6 bg-purple-50 rounded-xl border border-purple-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <span className="text-sm text-gray-600 block font-medium">Protein</span>
                  <p className="text-xl font-bold text-purple-800">{Math.round(analysis.macronutrient_targets.protein_grams)}g</p>
                  <p className="text-sm text-gray-500">({analysis.macronutrient_targets.protein_percentage}%)</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <span className="text-sm text-gray-600 block font-medium">Carbohydrates</span>
                  <p className="text-xl font-bold text-purple-800">{Math.round(analysis.macronutrient_targets.carbs_grams)}g</p>
                  <p className="text-sm text-gray-500">({analysis.macronutrient_targets.carbs_percentage}%)</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <span className="text-sm text-gray-600 block font-medium">Fats</span>
                  <p className="text-xl font-bold text-purple-800">{Math.round(analysis.macronutrient_targets.fat_grams)}g</p>
                  <p className="text-sm text-gray-500">({analysis.macronutrient_targets.fat_percentage}%)</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <span className="text-sm text-gray-600 block font-medium">Fiber</span>
                  <p className="text-xl font-bold text-purple-800">{Math.round(analysis.macronutrient_targets.fiber_grams)}g</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hydration */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('hydration')}
            className="flex items-center w-full text-left p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl hover:from-cyan-100 hover:to-cyan-150 transition-all duration-200 border border-cyan-200"
          >
            {expandedSections.hydration ? <ChevronDown className="text-cyan-600" /> : <ChevronRight className="text-cyan-600" />}
            <Droplets className="ml-2 mr-3 h-5 w-5 text-cyan-600" />
            <span className="font-semibold text-cyan-800">Hydration Requirements</span>
          </button>
          
          {expandedSections.hydration && analysis.hydration_requirements && (
            <div className="mt-4 p-6 bg-cyan-50 rounded-xl border border-cyan-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Droplets className="h-12 w-12 mx-auto text-cyan-600 mb-3" />
                  <span className="text-lg text-gray-600 block font-medium">Daily Water Goal</span>
                  <p className="text-3xl font-bold text-cyan-800">{analysis.hydration_requirements.total_water_liters}L</p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <Droplets className="h-12 w-12 mx-auto text-cyan-600 mb-3" />
                  <span className="text-lg text-gray-600 block font-medium">Base Requirement</span>
                  <p className="text-3xl font-bold text-cyan-800">{analysis.hydration_requirements.base_water_liters}L</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPlanData = () => {
    if (!responseData?.plan) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 flex items-center mb-6">
          <Target className="mr-2 h-6 w-6 text-indigo-600" />
          Your Weekly Diet Plan
        </h3>

        {Object.entries(responseData.plan).map(([day, dayData]) => (
          <div key={day} className="mb-4">
            <button
              onClick={() => toggleDay(day)}
              className="flex items-center justify-between w-full text-left p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl hover:from-indigo-100 hover:to-indigo-150 transition-all duration-200 border border-indigo-200"
            >
              <span className="font-semibold text-indigo-800 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                {day}
              </span>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-indigo-600 bg-white px-4 py-2 rounded-full border border-indigo-200 font-medium">
                  {Object.keys(dayData).filter(key => key !== 'Totals').length} meals planned
                </span>
                {expandedDays[day] ? <ChevronDown className="text-indigo-600" /> : <ChevronRight className="text-indigo-600" />}
              </div>
            </button>

            {expandedDays[day] && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                {/* Day Totals */}
                {dayData.Totals && (
                  <div className="mb-6 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                    <h5 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Target className="mr-2 h-5 w-5 text-indigo-600" />
                      Daily Nutrition Summary
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <span className="text-sm text-gray-600 block font-medium">Protein</span>
                        <p className="text-lg font-bold text-blue-800">{dayData.Totals.Protein_g?.toFixed(1)}g</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <span className="text-sm text-gray-600 block font-medium">Carbs</span>
                        <p className="text-lg font-bold text-yellow-800">{dayData.Totals.Carbs_g?.toFixed(1)}g</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <span className="text-sm text-gray-600 block font-medium">Fat</span>
                        <p className="text-lg font-bold text-purple-800">{dayData.Totals.Fat_g?.toFixed(1)}g</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <span className="text-sm text-gray-600 block font-medium">Fiber</span>
                        <p className="text-lg font-bold text-orange-800">{dayData.Totals.Fibre_g?.toFixed(1)}g</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Meals */}
                <div className="space-y-4">
                  {Object.entries(dayData).filter(([key]) => key !== 'Totals').map(([mealType, mealData]) => (
                    <div key={mealType} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                      <h5 className="font-semibold text-gray-800 mb-4 flex items-center">
                        <Utensils className="mr-2 h-5 w-5 text-green-600" />
                        {mealType}
                      </h5>
                      
                      {mealData.Items && (
                        <div className="space-y-3">
                          {mealData.Items.map((item, index) => (
                            <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 border-green-500 hover:shadow-md transition-shadow">
                              <div className="font-medium text-gray-800 mb-3 text-lg">{item.Recipe}</div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600">
                                <span className="flex items-center bg-white px-3 py-2 rounded-lg">
                                  <Apple className="mr-2 h-4 w-4 text-green-600" />
                                  {item.Protein_g}g protein
                                </span>
                                <span className="flex items-center bg-white px-3 py-2 rounded-lg">
                                  <Target className="mr-2 h-4 w-4 text-blue-600" />
                                  {item.Cuisine} cuisine
                                </span>
                                <span className="flex items-center bg-white px-3 py-2 rounded-lg">
                                  <Scale className="mr-2 h-4 w-4 text-purple-600" />
                                  {item.Amount_g}g serving
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {mealData.MealTotals && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="text-sm font-medium text-gray-700 flex items-center">
                            <Info className="mr-2 h-4 w-4 text-gray-600" />
                            <strong>Meal Summary: </strong>
                            <span className="ml-2">{mealData.MealTotals.Protein_g?.toFixed(1)}g protein</span>
                          </div>
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Heart className="mr-3 h-8 w-8 text-red-500" />
              Your Personal Diet Plan
            </h1>
          </div>
        </div>
      </div>
      <button
  onClick={() => {
    localStorage.clear();
    window.location.href = "/";
  }}
  className="fixed top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors"
>
  Logout
</button>


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Token Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Search className="mr-2 h-6 w-6 text-blue-600" />
            Access Your Diet Plan
          </h2>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your access token here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && fetchPlanByToken()}
              />
            </div>
            <button
              onClick={fetchPlanByToken}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Search className="h-5 w-5 mr-2" />
              )}
              {loading ? 'Loading...' : 'Get My Plan'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
              <span className="text-red-700">{error}</span>
            </div>
          )}
        </div>

        {/* Results Display */}
        {responseData && (
          <div className="space-y-6">
            {renderPatientInfo()}
            {renderAnalysisData()}
            {renderPlanData()}
            
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700">
                Your personalized diet plan has been successfully loaded! Follow this plan consistently for the best results.
              </span>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!responseData && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5 text-blue-600" />
              How to use:
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 flex-shrink-0 mt-0.5">1</span>
                <p>Enter the access token provided by your doctor</p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 flex-shrink-0 mt-0.5">2</span>
                <p>Click "Get My Plan" to load your personalized diet plan</p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 flex-shrink-0 mt-0.5">3</span>
                <p>Review your health analysis and follow the weekly meal plan</p>
              </div>
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mr-3 flex-shrink-0 mt-0.5">4</span>
                <p>Contact your doctor if you have any questions about your plan</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Important Note</h4>
                  <p className="text-sm text-blue-700">
                    This personalized diet plan has been created specifically for your health profile and goals. 
                    Please follow the recommendations consistently and consult your healthcare provider for any concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPage;