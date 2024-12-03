import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Step3Details = () => {
  const { cropId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const crop = location.state?.crop;
  const [results, setResults] = useState(null);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const calculateNutrientRequirements = (crop, area) => {
    const baseNPK = crop.npk;
    return baseNPK.map(nutrient => nutrient * area);
  };

  const calculateFertilizerQuantity = (requiredNutrients, fertilizerRatio) => {
    const ratioMultipliers = fertilizerRatio.map((ratio, idx) => 
      ratio > 0 ? requiredNutrients[idx] / ratio : 0
    );
    
    const multiplier = Math.max(...ratioMultipliers.filter(m => m > 0));
    const totalQuantityKg = multiplier * (fertilizerRatio.reduce((a, b) => a + b, 0));
    
    return {
      quantityTons: (totalQuantityKg / 1000).toFixed(2),
      nutrientsProvided: fertilizerRatio.map(ratio => (ratio * multiplier).toFixed(2)),
      ratio: fertilizerRatio.join(':')
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      landArea: parseFloat(formData.get('landArea')),
      fertilizerN: parseInt(formData.get('fertilizerN')),
      fertilizerP: parseInt(formData.get('fertilizerP')),
      fertilizerK: parseInt(formData.get('fertilizerK'))
    };

    const requiredNutrients = calculateNutrientRequirements(crop, data.landArea);
    const fertilizerRatio = [data.fertilizerN, data.fertilizerP, data.fertilizerK];
    const fertilizer = calculateFertilizerQuantity(requiredNutrients, fertilizerRatio);

    setResults({
      crop,
      area: data.landArea,
      requiredNutrients,
      fertilizer
    });
  };

  const handleSoilAnalysis = () => {
    navigate('/soil-analysis', {
      state: {
        returnPath: `/step3/${cropId}`,
        crop: crop
      }
    });
  };

  const npkTopics = {
    N: {
      title: t.nitrogenTitle || 'Nitrogen (N)',
      description: t.nitrogenDesc || 'Essential for leaf growth and green vegetation',
      icon: '🌿',
      color: 'bg-green-50',
      border: 'border-green-200'
    },
    P: {
      title: t.phosphorusTitle || 'Phosphorus (P)',
      description: t.phosphorusDesc || 'Important for root and flower development',
      icon: '🌱',
      color: 'bg-blue-50',
      border: 'border-blue-200'
    },
    K: {
      title: t.potassiumTitle || 'Potassium (K)',
      description: t.potassiumDesc || 'Helps in fruit development and disease resistance',
      icon: '🍎',
      color: 'bg-yellow-50',
      border: 'border-yellow-200'
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {t.enterLandDetails}
          </h2>
          <button
            onClick={handleSoilAnalysis}
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            <span className="text-xl mr-2">🔬</span>
            {t.analyzeSoil}
          </button>
        </div>

        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
            {t.enterLandDetails}
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {t.landArea}
              </label>
              <input
                type="number"
                name="landArea"
                defaultValue={1}
                className="w-full text-lg p-3 border-2 border-gray-300 rounded-lg"
                required
                min="0.1"
                step="0.1"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {t.npkRatioLabel}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {Object.entries(npkTopics).map(([nutrient, info]) => (
                  <div 
                    key={nutrient}
                    className={`p-6 rounded-lg border-2 ${info.color} ${info.border}`}
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{info.icon}</span>
                      <h4 className="text-lg font-medium">{info.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {info.description}
                    </p>
                    <div className="mt-auto">
                      <label className="block text-gray-700 mb-2">
                        {t[`nutrient${nutrient}`]}
                      </label>
                      <input
                        type="number"
                        name={`fertilizer${nutrient}`}
                        defaultValue={0}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg"
                        required
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700"
            >
              {t.calculateRequirements}
            </button>
          </form>
        </div>

        {results && (
          <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3">
                <img 
                  src={`/images/crops/${results.crop.category.toLowerCase().replace(' ', '-')}/${results.crop.image}`}
                  alt={t.crops[results.crop.name.toLowerCase()]}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <h2 className="text-2xl font-bold text-green-800">
                  {t.crops[results.crop.name.toLowerCase()]} {t.manureGuide}
                </h2>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-lg">{t.fieldSize}:</span>
                  <span className="font-bold text-lg">
                    {results.area} hectares ({(results.area * 2.47).toFixed(2)} acres)
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{t.manureDetails}:</h3>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">{t.totalBags}:</p>
                        <p className="text-xl font-bold">{Math.ceil(results.fertilizer.quantityTons * 20)} bags</p>
                        <p className="text-sm text-gray-500">{t.bagWeight}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">{t.fertilizerType}:</p>
                        <p className="text-xl font-bold">NPK {results.fertilizer.ratio}</p>
                        <p className="text-sm text-gray-500">{t.allComplex}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setResults(null)}
              className="mt-6 w-full py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              {t.calculateAgain}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3Details;