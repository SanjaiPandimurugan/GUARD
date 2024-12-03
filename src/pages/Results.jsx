import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { crop, formData } = location.state || {};

  if (!crop || !formData) {
    return navigate('/');
  }

  const requiredNutrients = calculateNutrientRequirements(crop, parseFloat(formData.landArea));
  const fertilizerRatio = [
    parseInt(formData.fertilizerN),
    parseInt(formData.fertilizerP),
    parseInt(formData.fertilizerK)
  ];

  const fertilizer = calculateFertilizerQuantity(requiredNutrients, fertilizerRatio);

  return (
    <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">
          Fertilizer Recommendation
        </h2>
        <div className="flex items-center justify-center mt-2">
          <span className="text-3xl mr-2">{crop.icon}</span>
          <p className="text-xl">{crop.name}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="text-2xl mr-2">📊</span> Key Numbers
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Land Area:</span>
              <span className="font-bold text-lg">{formData.landArea} hectares</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Fertilizer:</span>
              <span className="font-bold text-lg">{fertilizer.quantityTons} tons</span>
            </div>
            <div className="flex justify-between items-center">
              <span>NPK Ratio:</span>
              <span className="font-bold text-lg">{fertilizer.ratio}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="text-2xl mr-2">🌱</span> Growing Guide
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-xl mr-2">🗓️</span>
              <span>Season: {crop.season}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">⏱️</span>
              <span>Duration: {crop.growthDuration}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">💧</span>
              <span>Water Needs: {crop.waterRequirement}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
        <div className="flex">
          <span className="text-2xl mr-2">💡</span>
          <p>{crop.characteristics}</p>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center justify-center"
        >
          <span className="text-xl mr-2">🔄</span>
          Calculate for Another Crop
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
        >
          <span className="text-xl mr-2">📄</span>
          Print Results
        </button>
      </div>
    </div>
  );
};

export default Results; 